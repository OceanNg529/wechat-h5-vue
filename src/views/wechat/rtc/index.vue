<template>
	<div class="qnwebrtc">
		<p>Wait for other conference members to join.</p>
		<div id="remotetracks"></div>
		<div id="localtracks"></div>
	</div>
</template>
<style scoped>
#remotetracks {
	width: 100%;
	height: 31rem;
	position: relative;
	z-index: 99;
}

#localtracks {
	width: 12rem;
}

.qnwebrtc p {
	width: 40rem;
	height: 30rem;
	position: absolute;
	z-index: 9;
	text-align: center;
	line-height: 30rem;
}
</style>
<script>
import QNRTC from "qnweb-rtc";
import {
	createRoomToken
} from "@/api/qnrtc";
export default {
	name: "Qnwebrtc",
	components: {},
	data() {
		return {
			localTrackstemp: null,
			mclient: null,
			remoteTracksNum: 0,
		};
	},
	computed: {},
	created() {
		this.createRoom();
	},
	mounted() { },
	methods: {
		createRoom() {
			createRoomToken().then((response) => {
				if (response.code === 200) {
					this.joinRoom(response.data);
				} else {
					this.$alert(response.msg, "Alert", {
						confirmButtonText: "Confirm",
						callback: (action) => { },
					});
				}
			});
		},
		// 这里采用的是 async/await 的异步方案，您也可以根据需要或者习惯替换成 Promise 的写法
		async joinRoom(token) {
			// 创建QNRTCClient对象
			const client = QNRTC.createClient();
			// 需要先监听对应事件再加入房间
			this.autoSubscribe(client);
			// 这里替换成刚刚生成的 RoomToken
			await client.join(token);
			//录制本地
			await this.publish(client);
			console.log("joinRoom success!");
			for (let i = 0; i < this.remoteTracksNum; i++) {
				document.getElementById("remotetracks").children[i].style.width =
					100 / this.remoteTracksNum + "%";
			}
		},
		// 增加一个函数 publish，用于采集并发布自己的媒体流
		// 这里的参数 client 是指刚刚初始化的 QNRTCClient 对象
		async publish(client) {
			// 同时采集麦克风音频和摄像头视频轨道。
			// 这个函数会返回一组audio track 与 video track
			const localTracks = await QNRTC.createMicrophoneAndCameraTracks();
			//退出用的clien
			this.localTrackstemp = localTracks;
			this.mclient = client;
			// 将刚刚的 Track 列表发布到房间中
			await client.publish(localTracks);
			console.log("publish success!");
			// 在这里添加
			// 获取页面上的一个元素作为播放画面的父元素
			document.getElementById("localtracks").innerHTML = "";
			const localElement = document.getElementById("localtracks");
			// 遍历本地采集的 Track 对象
			for (const localTrack of localTracks) {
				// 如果这是麦克风采集的音频 Track，我们就不播放它。
				if (localTrack.track.info.kind === "audio") continue;
				// 调用 Track 对象的 play 方法在这个元素下播放视频轨
				localTrack.play(localElement);
			}
		},
		// 这里的参数 client 是指刚刚初始化的 QNRTCClient 对象
		async subscribe(client, trackInfoList) {
			// 通过传入 trackInfoList 调用订阅方法发起订阅，成功会返回相应的 Track 对象，也就是远端的 Track 列表了
			const remoteTracks = await client.subscribe(trackInfoList);
			// 选择页面上的一个元素作为父元素，播放远端的音视频轨
			const remoteElement = document.getElementById("remotetracks");
			// 遍历返回的远端 Track，调用 play 方法完成在页面上的播放

			for (const remoteTrack of remoteTracks.videoTracks) {
				this.remoteTracksNum++;
				remoteTrack.play(remoteElement);
			}
		},
		// 这里的参数 client 是指刚刚初始化的 QNRTCClient 对象, 同上
		autoSubscribe(client) {
			// 添加事件监听，当房间中出现新的 Track 时就会触发，参数是 trackInfo 列表
			client.on("user-published", (userId, tracks) => {
				console.log("user-published!", userId, tracks);
				this.subscribe(client, tracks)
					.then(() => console.log("subscribe success!"))
					.catch((e) => console.error("subscribe error", e));
			});
			// 就是这样，就像监听 DOM 事件一样通过 on 方法监听相应的事件并给出处理函数即可
		},
	},
	watch: {},
};
</script>