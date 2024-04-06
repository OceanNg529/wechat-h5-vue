<template>
  <div class="main" :class="{'main-min':mainMin}">
      <div class="top animate__animated animate__slideInDown">
          <div class="copyright_logo">
            <el-image src="../static/wechat/gongqing/qiyuan/copyright_logo.png"></el-image>
          </div>
          <div class="qiyuan_all_button" v-show="isShowQiyuanAllButton">
            <el-image src="../static/wechat/gongqing/qiyuan/qiyuan_all.png?2022" @click="qiyuan_all"></el-image>
          </div>
      </div>
      <div class="bgmask" :style="{'z-index': bgmaskIndex}" v-show="isShowBgmask"></div>
      <div class="loading" v-show="isShowLoading"><el-image src="../static/wechat/shijian/answer/3/loading.svg"></el-image></div>
      <div class="copyright animate__animated animate__slideInUp"><el-image src="../static/wechat/gongqing/qiyuan/copyright.png?2022"></el-image></div>
      <div class="msg" v-show="isShowMsg">
        <div class="msg_ico animate__animated animate__zoomIn"><el-image src="../static/wechat/gongqing/qiyuan/msg_ico.png"></el-image></div>
        <div class="msg_content animate__animated animate__slideInDown">
          {{ msgContent }}
        </div>
        <div class="close_button animate__animated animate__slideInUp" @click="close_button">
          <el-image src="../static/wechat/gongqing/qiyuan/close_button.png"></el-image>
        </div>
      </div>
      <div class="index" v-show="isShowIndex">
        <div class="centerBox">
            <div class="index_title animate__animated animate__fadeInDown"><el-image src="../static/wechat/gongqing/qiyuan/index_title.png"></el-image></div>
            <div class="index_role1"><el-image src="../static/wechat/gongqing/qiyuan/index_role1.png"></el-image></div>
            <div class="index_role2 animate__animated animate__zoomIn"><el-image src="../static/wechat/gongqing/qiyuan/index_role2.png"></el-image></div>
            <div class="index_lamp" v-show="isShowLamp"><el-image src="../static/wechat/gongqing/qiyuan/index_lamp.png"></el-image></div>
            <div class="index_cloud1 animate__animated animate__zoomIn"><el-image src="../static/wechat/gongqing/qiyuan/index_cloud1.png"></el-image></div>
            <div class="index_cloud2 animate__animated animate__zoomIn"><el-image src="../static/wechat/gongqing/qiyuan/index_cloud2.png"></el-image></div>
            <div class="start_button animate__animated animate__heartBeat"><el-image src="../static/wechat/gongqing/qiyuan/start_button.png" @click="start_button"></el-image></div>
        </div>
      </div>
      <div class="game" v-show="isShowGame">
        <div class="centerBox">
            <div class="game_list">
              <ul>
                <li v-for="(qiyuan,key) in qiyuanList" :key="key" @click="openQiyuanDetail(key)">{{qiyuan.content}}</li>
              </ul>
            </div>
            <div class="game_role1 animate__animated animate__zoomIn"><el-image src="../static/wechat/gongqing/qiyuan/game_role1.png"></el-image></div>
            <div class="game_role2"><el-image src="../static/wechat/gongqing/qiyuan/index_role1.png"></el-image></div>
            <div class="game_role_msg animate__animated animate__zoomIn"><el-image src="../static/wechat/gongqing/qiyuan/game_role_msg.png"></el-image></div>
            <div class="game_box animate__animated animate__fadeInDown"><el-image src="../static/wechat/gongqing/qiyuan/myprize_button.png" @click="openMyPrizeLog"></el-image></div>
            <div class="button_list animate__animated animate__slideInUp">
              <el-image src="../static/wechat/gongqing/qiyuan/qiyuan_button.png?2022" @click="qiyuan_button"></el-image>
              <el-image src="../static/wechat/gongqing/qiyuan/qiyuancopy_button.png" @click="qiyuancopy_button"></el-image>
            </div>
        </div>
      </div>
      <div class="qiyuan_input" v-show="isShowInput">
        <div class="input animate__animated animate__zoomIn">
            <p v-show="isShowCopyNow">您的祈愿:</p>
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" placeholder="我来祈愿/送祝福" v-model="qiyuanInfo.content" v-show="isShowCopyNow"></el-input>
            <p>真实姓名:</p>
            <el-input placeholder="请输入您的真实姓名" v-model="qiyuanInfo.name"></el-input>
            <p>手机号码:</p>
            <el-input placeholder="请输入您的手机号码" v-model="qiyuanInfo.mobile"></el-input>
            <div class="input_tips"><el-image src="../static/wechat/gongqing/qiyuan/input_tips.png"></el-image></div>
        </div>
        <div class="button_list animate__animated animate__slideInUp">
          <el-image src="../static/wechat/gongqing/qiyuan/submit_button.png?202203" @click="onSubmit"></el-image>
          <el-image src="../static/wechat/gongqing/qiyuan/close_button.png" @click="close_button"></el-image>
        </div>
      </div>
      <div class="copy_tips animate__animated animate__slideInDown" v-show="isShowCopyTips">
        <el-image src="../static/wechat/gongqing/qiyuan/copy_tips.png" @click="copy_tips"></el-image>
      </div>
      <div class="qiyuan_detail" v-show="isShowQiyuanDetail">
        <div class="animate__animated animate__zoomIn">
          <div class="detail_title"><el-image src="../static/wechat/gongqing/qiyuan/qiyuan_content_title.png"></el-image></div>
          <div class="detail_content">
            <div class="scroll">{{ qiyuanDetail }}</div>
          </div>
          <div class="button_list animate__animated animate__slideInUp">
            <el-image src="../static/wechat/gongqing/qiyuan/qiyuancopy_button.png" @click="copyQiyuan"></el-image>
            <el-image src="../static/wechat/gongqing/qiyuan/close_button.png" @click="close_button"></el-image>
          </div>
        </div> 
      </div>
      <div class="qiyuan_all" v-show="isShowQiyuanAll">
        <div class="animate__animated animate__fadeInDown">
          <div class="all_title"><el-image src="../static/wechat/gongqing/qiyuan/qiyuan_all_title.png"></el-image></div>
          <div class="all_content">
            <div class="scroll">
              <ul class="all_list">
                <li v-for="(qiyuan,key) in qiyuanAllList" :key="key">
                  <div class="scroll">{{qiyuan.content}}</div>
                  <p>
                    {{ qiyuan.createtime | formatDate('YYYY-MM-DD') }}
                    <span @click="openQiyuanDetail(key)">认领Ta</span>
                  </p>
                </li>
              </ul>
              <div class="more" @click="qiyuan_more">更多祈愿～</div>
            </div>
          </div>
          <div class="close_button animate__animated animate__slideInUp" @click="close_button">
            <el-image src="../static/wechat/gongqing/qiyuan/close_button.png"></el-image>
          </div>
        </div>
      </div>
      <div class="luck" v-show="isShowLuckBox">
          <el-image src="../static/wechat/gongqing/qiyuan/game_box.png" @click="onLuckButton"></el-image>
          <el-image src="../static/wechat/gongqing/qiyuan/choujiang_tips.png" @click="onLuckButton"></el-image>
      </div>
      <div class="myprize_log" v-show="isShowMyprizeLog">
        <div class="animate__animated animate__fadeInDown">
          <div class="myprize_log_title"><el-image src="../static/wechat/gongqing/qiyuan/myprize_title.png"></el-image></div>
          <div class="myprize_log_content">
            <div class="scroll">
              <ul class="myprize_list">
                <li v-for="(myprize,key) in myprizeList" :key="key">
                  {{myprize.awardname}}
                  <span>{{ myprize.createtime | formatDate('YYYY-MM-DD') }}</span>
                </li>
                <div class="notmyprize" v-show="notmyprize">您还没中奖记录喔～</div>
              </ul>
            </div>
          </div>
          <div class="close_button animate__animated animate__slideInUp" @click="close_button">
            <el-image src="../static/wechat/gongqing/qiyuan/close_button.png"></el-image>
          </div>
        </div> 
      </div>
  </div>
</template>
<script>
import { getOauth,getAnswer,submitQiyuan,getQiyuanList,goodLuck,getAwardLog } from '@/api/wechat';
import '@/styles/gongqing-qiyuan.scss';
import { validPhone } from '@/utils/validate';
import wx from 'weixin-js-sdk';
export default {
  name: 'Qiyuan',
  components: { },
  data() {
    return {
      settingId: 5,
      isShowBgmask: false,
      isShowLoading: false,
      isShowMsg: false,
      msgContent:'网络错误，请重试',
      bgmaskIndex: 99,
      isShowIndex: true,
      isShowGame: false,
      isShowInput: false,
      qiyuanInfo:{
        content:'',
        name:'',
        mobile:''
      },
      isShowCopyTips: false,
      isShowCopyNow: true,
      uploadSuccess: false,
      isShowLuckBox: false,
      qiyuanList:[],
      qiyuanAllList:[],
      isShowQiyuanDetail:false,
      qiyuanDetail:'',
      isShowQiyuanAllButton: false,
      isShowQiyuanAll: false,
      isShowMyprizeLog: false,
      qiyuanAllPage:0,
      myprizeList:[],
      notmyprize: true,
      isShowLamp:false,
      token: 'token',
      captcha: '',
      mainMin: false,
    }
  },
  created() {
    document.title = '高明区点亮志愿“云灯塔”';
    this.token = localStorage.getItem('wxgongqingtoken')?localStorage.getItem('wxgongqingtoken'):'token';
    if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger')
    {
      this.getUserinfo();
    }else{
      this.getCode();
    }
    if(window.outerHeight < 700){
      this.mainMin = true
    }
    //wechat audioAuto 
    // document.addEventListener("WeixinJSBridgeReady", function () {
    //   var audioAuto = document.getElementById('audio');
    //   audioAuto.play();
    // }, false);
    // window.alert = function(name){
    //   var iframe = document.createElement("IFRAME");
    //   iframe.style.display="none";
    //   iframe.setAttribute("src", 'data:text/plain');
    //   document.documentElement.appendChild(iframe);
    //   window.frames[0].window.alert(name);
    //   iframe.parentNode.removeChild(iframe);
    // }
  },
  mounted(){
    // this.$nextTick(function(){  //页面加载完成后执行
    //   this.getUserinfo();
    // })
  },
  computed: {
  },
  methods:{
    start_button(){
      if(this.isShowLamp !== true){
        this.isShowLamp = true;
        setTimeout(() =>{
          this.isShowIndex = false;
          this.isShowGame = true;
          this.isShowQiyuanAllButton = true;
          this.getList();
        },4000);
      }
    },
    close_button(){
      this.bgmaskIndex = 99;
      if(this.uploadSuccess == true){
        this.isShowMsg = false;
        this.isShowInput = false;
        this.isShowLuckBox = true;
        return;
      }
      if(this.isShowInput == true && this.isShowMsg == true){
        this.isShowMsg = false;
        return;
      }
      this.isShowInput = false;
      this.isShowQiyuanDetail = false;
      this.isShowQiyuanAll = false;
      this.isShowMyprizeLog = false;
      this.isShowBgmask = false;
      this.isShowMsg = false;
    },
    qiyuan_all(){
      this.isShowBgmask = true;
      this.isShowQiyuanAll = true;
      if(this.qiyuanAllList == null || this.qiyuanAllList == ''){
        getQiyuanList({id:this.settingId,num:5,page:this.qiyuanAllPage}).then(response => {
          this.isShowLoading = false;
          if(response.data.status == 200){
            this.qiyuanAllList = this.qiyuanAllList.concat(response.data.list);
            this.qiyuanAllPage = this.qiyuanAllPage + 5;
          }else{
            this.msgContent = '网络错误，请重试～';
            this.isShowBgmask = true;
            this.isShowMsg = true;
            this.bgmaskIndex = 9999;
            return;
          }
        }).catch((error) =>{
          this.msgContent = '网络错误，请重试～';
          this.isShowBgmask = true;
          this.isShowMsg = true;
          this.bgmaskIndex = 9999;
          this.isShowLoading = false;
          return;
        })
      }
    },
    qiyuan_more(){
      this.isShowBgmask = true;
      this.isShowLoading = true;
      getQiyuanList({id:this.settingId,num:5,page:this.qiyuanAllPage}).then(response => {
        this.isShowLoading = false;
        if(response.data.status == 200){
          this.qiyuanAllList = this.qiyuanAllList.concat(response.data.list);
          this.qiyuanAllPage = this.qiyuanAllPage + 5;
        }else{
          this.msgContent = '网络错误，请重试～';
          this.isShowBgmask = true;
          this.isShowMsg = true;
          this.bgmaskIndex = 9999;
          return;
        }
      }).catch((error) =>{
        this.msgContent = '网络错误，请重试～';
        this.isShowBgmask = true;
        this.isShowMsg = true;
        this.bgmaskIndex = 9999;
        this.isShowLoading = false;
        return;
      })
    },
    qiyuan_button(){
      this.isShowBgmask = true;
      this.isShowInput = true;
      this.isShowCopyNow = true;
      this.qiyuanInfo = {};
    },
    qiyuancopy_button(){
      this.isShowCopyTips = true;
    },
    copy_tips(){
      this.isShowCopyTips = false;
    },
    getList(){
      this.isShowBgmask = true;
      this.isShowLoading = true;
      getQiyuanList({id:this.settingId,num:8}).then(response => {
        this.isShowBgmask = false;
        this.isShowLoading = false;
        if(response.data.status == 200){
          this.qiyuanList = response.data.list;
        }else{
          this.msgContent = '网络错误，请重试～';
          this.isShowBgmask = true;
          this.isShowMsg = true;
          this.bgmaskIndex = 9999;
          return;
        }
      }).catch((error) =>{
        this.isShowLoading = false;
        this.msgContent = '网络错误，请重试～';
        this.isShowBgmask = true;
        this.isShowMsg = true;
        this.bgmaskIndex = 9999;
        return;
      })
    },
    openQiyuanDetail(key){
      this.isShowQiyuanDetail = true;
      this.isShowBgmask = true;
      if(this.isShowQiyuanAll == true){
        this.qiyuanDetail = this.qiyuanAllList[key]['content'];
        this.isShowQiyuanAll = false;
      }else{
        this.qiyuanDetail = this.qiyuanList[key]['content'];
      }
    },
    copyQiyuan(){
      this.qiyuanInfo.content = this.qiyuanDetail;
      this.isShowInput = true;
      this.isShowQiyuanDetail = false;
      this.isShowCopyNow = false;
    },
    getUserinfo(){
      if(this.$route.query.code == null || this.$route.query.code == undefined){
        if(this.token == null || this.token == undefined || this.token == 'token'){
          this.getCode();
        }else{
          this.getAnswerSetting();
        }
      }else{
        getOauth({ code: this.$route.query.code }).then(response => {
          if(response.data.status == 200){
            this.getAnswerSetting();
          }else{
            this.getCode();
          }
        }).catch((error) => {
          console.log(error)
          //this.getUserinfo();
        })
      }
		},
    getAnswerSetting(){
      getAnswer({ id:this.settingId, token:this.token }).then(response => {
        if(response.data.status == 200){
          if(response.data.ip_status == 1){
            this.setting = response.data.answer_setting;
            //wechat jssdk
            let that = this;
            setTimeout(function(){
              wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx8641dbc373d685fb', // 必填，公众号的唯一标识
                timestamp: response.data.sign_package.timestamp, // 必填，生成签名的时间戳
                nonceStr: response.data.sign_package.nonceStr, // 必填，生成签名的随机串
                signature: response.data.sign_package.signature,// 必填，签名
                jsApiList: [
                  'updateTimelineShareData',
                  'updateAppMessageShareData',
                  'onMenuShareTimeline',
                  'onMenuShareAppMessage',
                  //'getLocation'//微信定位
                ]
              });
              let share_data = {
                title: response.data.answer_setting.share_title,
                desc: response.data.answer_setting.share_desc,
                link: response.data.answer_setting.share_link,
                imgUrl: response.data.answer_setting.share_img
              };
              wx.ready(function () {
                wx.updateTimelineShareData(share_data);
                wx.updateAppMessageShareData(share_data);
                wx.onMenuShareTimeline(share_data);
                wx.onMenuShareAppMessage(share_data);
                // wx.getLocation({
                //   type: 'wgs84',
                //   success: response => {
                //     if(that.getDistance(response.latitude,response.longitude,22.84763,112.777598) > 50){
                //       that.isShowBgmask = true;
                //       that.isShowMsg = true;
                //       that.msgContent = '本次活动仅限佛山地区的用户参加.';
                //       that.isShowCloseButton = false;
                //       that.isShowLuckButton = false;
                //     }
                //   },
                //   cancel: function (res) {
                //     alert('请点击允许获取地理位置，获取的信息仅用于本活动.');
                //     document.location.reload();
                //   },
                //   fail: err => {
                //     alert('请点击允许获取地理位置，获取的信息仅用于本活动.');
                //     document.location.reload();
                //   }
                // });
              });
            },1000)
            this.isShowLoading = false;
            this.isShowBgmask = false;
            localStorage.setItem('wxgongqingtoken',response.data.token)
          }else{
            //其他信息提示
            this.setting.question_tips = '活动已经结束.';
            this.isShowLoading = false;
            this.isShowBgmask = true;
            this.isShowMsg = true;
            this.msgContent = response.data.msg;
            this.isShowCloseButton = false;
            this.isShowLuckButton = false;
          }
        }else{
          localStorage.removeItem('wxgongqingtoken');
          this.getCode();
        }
      }).catch((error) => {
        console.log(error);
        //this.getUserinfo();
      })
    },
    getCode(){
      const local = window.location.href;
      const appid = 'wx8641dbc373d685fb';
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
    },
    onSubmit(){
      if(this.qiyuanInfo.content == '' || this.qiyuanInfo.content == undefined || this.qiyuanInfo.content == null){
        this.msgContent = '祈愿内容不能为空喔～';
        this.isShowBgmask = true;
        this.isShowMsg = true;
        this.bgmaskIndex = 9999;
        return;
      }
      if(this.qiyuanInfo.name == '' || this.qiyuanInfo.name == undefined || this.qiyuanInfo.name == null){
        this.msgContent = '真实姓名不能为空喔～';
        this.isShowBgmask = true;
        this.isShowMsg = true;
        this.bgmaskIndex = 9999;
        return;
      }
      if(this.qiyuanInfo.mobile == '' || this.qiyuanInfo.mobile == undefined || this.qiyuanInfo.mobile == null){
        this.msgContent = '手机号码不能为空喔～';
        this.isShowBgmask = true;
        this.isShowMsg = true;
        this.bgmaskIndex = 9999;
        return;
      }else{
        if(!validPhone(this.qiyuanInfo.mobile)){
          this.msgContent = '手机号码格式错误，请核对一下.';
          this.isShowBgmask = true;
          this.isShowMsg = true;
          this.bgmaskIndex = 9999;
          return;
        }
      }
      this.isShowBgmask = true;
      this.isShowLoading = true;
      submitQiyuan({ id:this.settingId,qiyuanInfo:this.qiyuanInfo }).then(response => {
          this.isShowBgmask = false;
          this.isShowLoading = false;
          if(response.data.status == 200){
            this.captcha = response.data.captcha;
            this.msgContent = '上传成功，获得一次抽奖机会~';
            this.isShowBgmask = true;
            this.isShowMsg = true;
            this.bgmaskIndex = 9999;
            this.uploadSuccess = true;
            return;
          }else{
            this.msgContent = '上传失败，请重试~';
            this.isShowBgmask = true;
            this.isShowMsg = true;
            this.bgmaskIndex = 9999;
            return;
          }
      }).catch((error) => {
        this.msgContent = '上传失败，可能网络问题吧~';
        this.isShowBgmask = true;
        this.isShowMsg = true;
        this.bgmaskIndex = 9999;
        this.isShowLoading = false;
        return;
      })
    },
    openMyPrizeLog(){
      this.isShowBgmask = true;
      this.isShowMyprizeLog = true;
      getAwardLog({ id:this.settingId }).then(response => {
        if(response.data.status == 200){
          this.myprizeList = response.data.award;
          this.notmyprize = false;
          return;
        }else{
          this.notmyprize = true;
          return;
        }
      }).catch((error) => {
        this.msgContent = '您的网络好像有问题喔，请重新试下~';
        this.isShowBgmask = true;
        this.isShowMsg = true;
        this.bgmaskIndex = 9999;
        this.isShowLoading = false;
        return;
      })
    },
    onLuckButton(){
      this.isShowBgmask = true;
      this.isShowLoading = true;
      goodLuck({ id:this.settingId,captcha:this.captcha }).then(response => {
        this.msgContent = response.data.msg;
        this.isShowBgmask = true;
        this.isShowMsg = true;
        this.bgmaskIndex = 9999;
        this.isShowLuckBox = false;
        this.isShowLoading = false;
        this.uploadSuccess = false;
        this.qiyuanInfo = {};
        return;
      }).catch((error) => {
        this.msgContent = '您的网络好像有问题喔，请重新试下~';
        this.isShowBgmask = true;
        this.isShowMsg = true;
        this.bgmaskIndex = 9999;
        this.isShowLoading = false;
        return;
      })
    },
  }
}
</script>
