<template>
  <div class="main" :class="{ 'main-max': mainMax }">
    <div class="top animate__animated animate__slideInDown">
      <div class="back_button" v-show="isShowBackButton" @click="back_button">
        <el-image
          src="../static/wechat/shijian/answer/3/back_button.png"
        ></el-image>
      </div>
      <div class="left_logo">
        <el-image
          src="../static/wechat/shijian/answer/3/left_logo.png?202108313"
        ></el-image>
      </div>
      <div class="right_logo">
        <el-image
          src="../static/wechat/shijian/answer/3/right_logo.png?202108313"
        ></el-image>
      </div>
      <div class="button_list">
        <el-image
          src="../static/wechat/shijian/answer/3/music_button.png?202108313"
          @click="music_button"
          :class="{ on: musicActive == 1 }"
        ></el-image>
        <el-image
          v-show="isShowRuleButton"
          src="../static/wechat/shijian/answer/3/rule_button.png?202108313"
          @click="rule_button"
        ></el-image>
        <el-image
          v-show="isShowLogButton"
          src="../static/wechat/shijian/answer/3/log_button.png?202108313"
          @click="log_button"
        ></el-image>
        <el-image
          v-show="isShowTipsButton"
          src="../static/wechat/shijian/answer/3/tips_button.png?202108313"
          @click="tips_button"
        ></el-image>
      </div>
    </div>
    <div
      class="bgmask"
      :style="{ 'z-index': bgmaskIndex }"
      v-show="isShowBgmask"
    ></div>
    <div class="loading" v-show="isShowLoading">
      <el-image
        src="../static/wechat/shijian/answer/3/loading.svg"
      ></el-image>
    </div>
    <div class="msg" v-show="isShowMsg">
      <div class="box animate__animated animate__slideInDown">
        <div class="ico">
          <el-image
            src="../static/wechat/shijian/answer/3/msg_ico.png?202108313"
          ></el-image>
        </div>
        <div class="content">
          {{ msgContent }}
          <div class="msgtips">{{ answerTips }}</div>
        </div>
        <div
          class="close_button"
          v-show="isShowCloseButton"
          @click="onCloseButton"
        >
          <el-image
            src="../static/wechat/shijian/answer/3/close_button.png?202108313"
          ></el-image>
        </div>
        <div class="luck_button" v-if="isShowLuckButton" @click="onLuckButton">
          <el-image
            src="../static/wechat/shijian/answer/3/luck_button.png?202108313"
          ></el-image>
        </div>
        <div
          class="next_button"
          v-show="isShowNextButton"
          @click="onNextButton"
        >
          <el-image
            src="../static/wechat/shijian/answer/3/next_button.png?202108313"
          ></el-image>
        </div>
      </div>
    </div>
    <div class="wechat_cash" v-show="isShowWechatCash">
      <div class="box animate__animated animate__slideInDown">
        <div class="title">{{ wechatText }}</div>
        <div class="credit">{{ wechatCredit }}</div>
        <el-image
          src="../static/wechat/shijian/answer/3/wechat_cash.png?202108313"
        ></el-image>
        <div class="fail" v-show="isShowWechatCashFail">
          <el-image
            src="../static/wechat/shijian/answer/3/wechat_cash_fail.png?202108313"
          ></el-image>
        </div>
        <div class="success" v-show="isShowWechatCashSuccess">
          <el-image
            src="../static/wechat/shijian/answer/3/wechat_cash_success.png?20210908"
          ></el-image>
        </div>
        <div class="close_button" @click="onCloseButton">
          <el-image
            src="../static/wechat/shijian/answer/3/confirm_button.png?202108313"
          ></el-image>
        </div>
      </div>
    </div>
    <div class="copyright animate__animated animate__slideInUp">
      <el-image
        src="../static/wechat/shijian/answer/3/copyright.png?20210908"
      ></el-image>
    </div>
    <div
      class="index"
      v-show="isShowIndex"
      style="background-image:url('../static/wechat/shijian/answer/3/bg.jpg?2021')"
    >
      <div class="title animate__animated animate__slideInDown">
        <el-image
          src="../static/wechat/shijian/answer/3/title.png?202108313"
        ></el-image>
      </div>
      <div class="centerBox">
        <div class="role animate__animated animate__zoomIn">
          <el-image
            src="../static/wechat/shijian/answer/3/role.png?20210902"
          ></el-image>
        </div>
      </div>
      <div
        class="button_list animate__animated animate__pulse animate__infinite"
      >
        <el-image
          src="../static/wechat/shijian/answer/3/start_button.png?202108313"
          @click="onStratButton"
        ></el-image>
        <el-image
          src="../static/wechat/shijian/answer/3/total_button.png?202108313"
          @click="onTotalButton"
        ></el-image>
        <el-image
          src="../static/wechat/shijian/answer/3/news_button.png?202108313"
          @click="onNewsButton"
        ></el-image>
      </div>
    </div>

    <div class="game" v-show="isShowGame">
      <div class="game_tips" v-show="isShowGameTips" @click="onGameTips">
        <el-image
          :src="
            `../static/wechat/shijian/answer/3/game_tips_` +
              GameTipsSize +
              `.png?20210905`
          "
        ></el-image>
      </div>
      <div class="city animate__animated animate__slideInDown">
        <el-image
          src="../static/wechat/shijian/answer/3/city.png?202108313"
        ></el-image>
      </div>
      <div class="cloud">
        <el-image
          src="../static/wechat/shijian/answer/3/cloud.png?202108313"
        ></el-image>
      </div>
      <div class="box centerBox">
        <div class="sandbox">
          <div class="animate__animated animate__zoomIn">
            <el-image
              src="../static/wechat/shijian/answer/3/sandbox.png?20210906"
            ></el-image>
          </div>
          <div class="min_role step1" ref="min_role">
            <el-image
              src="../static/wechat/shijian/answer/3/min_role.png?202108313"
            ></el-image>
          </div>
          <div class="prize_box1">
            <el-image
              src="../static/wechat/shijian/answer/3/prize_box.png"
            ></el-image>
          </div>
          <div class="prize_box2">
            <el-image
              src="../static/wechat/shijian/answer/3/prize_box.png"
            ></el-image>
          </div>
          <div class="prize_box3">
            <el-image
              src="../static/wechat/shijian/answer/3/prize_box.png"
            ></el-image>
          </div>
          <div class="prize_box4">
            <el-image
              src="../static/wechat/shijian/answer/3/prize_box.png"
            ></el-image>
          </div>
          <div
            class="shake animate__animated animate__pulse animate__infinite"
            @click="onShake"
          >
            <el-image
              src="../static/wechat/shijian/answer/3/shake.png?202108313"
            ></el-image>
          </div>
        </div>
        <div class="ships animate__animated animate__zoomIn">
          <div class="ship">
            <el-image
              src="../static/wechat/shijian/answer/3/ship.png?202108313"
            ></el-image>
          </div>
          <div class="ship1">
            <el-image
              src="../static/wechat/shijian/answer/3/ship.png?202108313"
            ></el-image>
          </div>
          <div class="ship2">
            <el-image
              src="../static/wechat/shijian/answer/3/ship2.png?202108313"
            ></el-image>
          </div>
        </div>
        <div
          class="cubeBox animate__animated animate__zoomIn"
          v-show="isShowCubeBox"
        >
          <div class="wrapper w2">
            <div class="cube" ref="cube" :class="{ zhuan: isCubeZhuang }">
              <div class="side shakeFront">
                <div class="first_face">1</div>
              </div>
              <div class="side shakeBack">
                <div class="sixth_face">6</div>
              </div>
              <div class="side shakeRight">
                <div class="forth_face">4</div>
              </div>
              <div class="side shakeLeft">
                <div class="third_face">3</div>
              </div>
              <div class="side shakeTop">
                <div class="fifth_face">5</div>
              </div>
              <div class="side shakeBottom">
                <div class="second_face">2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hecheng animate__animated animate__slideInUp">
        <el-image
          src="../static/wechat/shijian/answer/3/hecheng.png?202108313"
        ></el-image>
      </div>
    </div>
    <div class="answer" v-show="isShowAnswer">
      <div class="box animate__animated animate__slideInDown">
        <div class="ico">
          <el-image
            src="../static/wechat/shijian/answer/3/answer_ico.png?202108313"
          ></el-image>
        </div>
        <div class="content">
          <div class="title">{{ questionNum }}. {{ answer_list.question }}</div>
          <div class="select">
            <ul>
              <li @click="select(1)">A. {{ answer_list.answer1 }}</li>
              <li @click="select(2)">B. {{ answer_list.answer2 }}</li>
              <li @click="select(3)" v-show="answer_list.answer3">
                C. {{ answer_list.answer3 }}
              </li>
              <li @click="select(4)" v-show="answer_list.answer4">
                D. {{ answer_list.answer4 }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="total" v-show="isShowTotal">
      <div class="box">
        <div class="ico animate__animated animate__slideInDown">
          <el-image
            src="../static/wechat/shijian/answer/3/total_ico.png?202108313"
          ></el-image>
        </div>
        <div class="content animate__animated animate__slideInDown">
          <el-image
            src="../static/wechat/shijian/answer/3/1.jpg?20210912"
          ></el-image>
          <el-image
            src="../static/wechat/shijian/answer/3/2.jpg?20210905"
          ></el-image>
          <el-image
            src="../static/wechat/shijian/answer/3/3.jpg?20210905"
          ></el-image>
          <el-image
            src="../static/wechat/shijian/answer/3/4.jpg?20210905"
          ></el-image>
          <el-image
            src="../static/wechat/shijian/answer/3/5.jpg?20210905"
          ></el-image>
          <el-image
            src="../static/wechat/shijian/answer/3/6.jpg?20210905"
          ></el-image>
          <el-image
            src="../static/wechat/shijian/answer/3/7.jpg?20210905"
          ></el-image>
          <el-image
            src="../static/wechat/shijian/answer/3/8.jpg?20210905"
          ></el-image>
        </div>
        <div
          class="close_button animate__animated animate__slideInUp"
          v-show="isShowCloseButton"
          @click="onCloseButton"
        >
          <el-image
            src="../static/wechat/shijian/answer/3/confirm_button.png?202108313"
          ></el-image>
        </div>
      </div>
    </div>
    <div class="award" v-show="isShowAward">
      <div class="box">
        <div class="ico animate__animated animate__slideInDown">
          <el-image
            src="../static/wechat/shijian/answer/3/award_ico.png?202108313"
          ></el-image>
        </div>
        <div class="content animate__animated animate__slideInDown">
          <div class="awardList">
            <ul>
              <li v-for="(award, index) in awardList" :key="index">
                <span class="name">{{ award.awardname }}</span>
                <span class="time">{{
                  award.createtime | formatDate("YYYY-MM-DD")
                }}</span>
                <span class="status">已兑换</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="close_button animate__animated animate__slideInUp"
          v-show="isShowCloseButton"
          @click="onCloseButton"
        >
          <el-image
            src="../static/wechat/shijian/answer/3/confirm_button.png?202108313"
          ></el-image>
        </div>
      </div>
    </div>
    <div class="rule" v-show="isShowRule">
      <div class="box">
        <div class="ico animate__animated animate__slideInDown">
          <el-image
            src="../static/wechat/shijian/answer/3/rule_ico.png?202108313"
          ></el-image>
        </div>
        <div
          class="content animate__animated animate__slideInDown"
          v-html="ruleContent"
        ></div>
        <div
          class="close_button animate__animated animate__slideInUp"
          v-show="isShowCloseButton"
          @click="onCloseButton"
        >
          <el-image
            src="../static/wechat/shijian/answer/3/confirm_button.png?202108313"
          ></el-image>
        </div>
      </div>
    </div>
    <div class="tips" v-show="isShowTips">
      <div class="box">
        <div class="ico animate__animated animate__slideInDown">
          <el-image
            src="../static/wechat/shijian/answer/3/tips_ico.png?202108313"
          ></el-image>
        </div>
        <div class="content animate__animated animate__slideInDown">
          <div v-html="setting.question_tips"></div>
        </div>
        <div
          class="close_button animate__animated animate__slideInUp"
          v-show="isShowCloseButton"
          @click="onCloseButton"
        >
          <el-image
            src="../static/wechat/shijian/answer/3/confirm_button.png?202108313"
          ></el-image>
        </div>
      </div>
    </div>
    <div class="news" v-show="isShowNews">
      <div class="box">
        <div class="ico animate__animated animate__slideInDown">
          <el-image
            src="../static/wechat/shijian/answer/3/news_ico.png?202108313"
          ></el-image>
        </div>
        <div class="content animate__animated animate__slideInDown">
          <div class="list">
            <ul>
              <li>
                <a href="https://mp.weixin.qq.com/s/SXvDBalo7kl2kThFVKZO1A">
                  <div class="title">
                    <div class="text">
                      “配制酱油”和 “配制食醋”：是我们不配 | 食安周
                    </div>
                    <div class="img">
                      <el-image
                        src="../static/wechat/shijian/answer/3/news_ico1.png"
                        fit="contain"
                      ></el-image>
                    </div>
                  </div>
                  <div class="more">
                    <span>查看详细</span>
                    <i
                      class="el-select__caret el-input__icon el-icon-arrow-up"
                    ></i>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://mp.weixin.qq.com/s/-tXm1PZySceGy1i_tE2LqQ">
                  <div class="title">
                    <div class="text">自热食品的消费提示 | 食安周</div>
                    <div class="img">
                      <el-image
                        src="../static/wechat/shijian/answer/3/news_ico2.png"
                        fit="contain"
                      ></el-image>
                    </div>
                  </div>
                  <div class="more">
                    <span>查看详细</span>
                    <i
                      class="el-select__caret el-input__icon el-icon-arrow-up"
                    ></i>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://mp.weixin.qq.com/s/c1QLgU0kIA9Jgay0jFVuXQ">
                  <div class="title">
                    <div class="text">
                      吃鸡警惕这种病毒！近期已有人中招 | 食安周
                    </div>
                    <div class="img">
                      <el-image
                        src="../static/wechat/shijian/answer/3/news_ico3.png"
                        fit="contain"
                      ></el-image>
                    </div>
                  </div>
                  <div class="more">
                    <span>查看详细</span>
                    <i
                      class="el-select__caret el-input__icon el-icon-arrow-up"
                    ></i>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://mp.weixin.qq.com/s/UpEtfWNBE24yY8I37M4TdA">
                  <div class="title">
                    <div class="text">
                      食品经营许可证过期！也要罚？莫慌！点进来
                    </div>
                    <div class="img">
                      <el-image
                        src="../static/wechat/shijian/answer/3/news_ico4.png"
                        fit="contain"
                      ></el-image>
                    </div>
                  </div>
                  <div class="more">
                    <span>查看详细</span>
                    <i
                      class="el-select__caret el-input__icon el-icon-arrow-up"
                    ></i>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://mp.weixin.qq.com/s/9lNkQ6mY7elJ9IKRIPh2ag">
                  <div class="title">
                    <div class="text">
                      开学季，“小馋猫”出动，这些知识要牢记！
                    </div>
                    <div class="img">
                      <el-image
                        src="../static/wechat/shijian/answer/3/news_ico5.png"
                        fit="contain"
                      ></el-image>
                    </div>
                  </div>
                  <div class="more">
                    <span>查看详细</span>
                    <i
                      class="el-select__caret el-input__icon el-icon-arrow-up"
                    ></i>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://mp.weixin.qq.com/s/68aF8ZwFWUw20jETt3KlPQ">
                  <div class="title">
                    <div class="text">
                      荷城街道2021年度十项民生实事项目出炉！
                    </div>
                    <div class="img">
                      <el-image
                        src="../static/wechat/shijian/answer/3/news_ico6.png"
                        fit="contain"
                      ></el-image>
                    </div>
                  </div>
                  <div class="more">
                    <span>查看详细</span>
                    <i
                      class="el-select__caret el-input__icon el-icon-arrow-up"
                    ></i>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://mp.weixin.qq.com/s/QN4X_37auGDw1Yhy7zB8_w">
                  <div class="title">
                    <div class="text">动真格！荷城重拳整治农贸市场周边环境</div>
                    <div class="img">
                      <el-image
                        src="../static/wechat/shijian/answer/3/news_ico7.png"
                        fit="contain"
                      ></el-image>
                    </div>
                  </div>
                  <div class="more">
                    <span>查看详细</span>
                    <i
                      class="el-select__caret el-input__icon el-icon-arrow-up"
                    ></i>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://mp.weixin.qq.com/s/BIapiVxhMYfJfKPQMCE5Qw">
                  <div class="title">
                    <div class="text">缺德！过期食品涂改日期上市售卖！</div>
                    <div class="img">
                      <el-image
                        src="../static/wechat/shijian/answer/3/news_ico8.png"
                        fit="contain"
                      ></el-image>
                    </div>
                  </div>
                  <div class="more">
                    <span>查看详细</span>
                    <i
                      class="el-select__caret el-input__icon el-icon-arrow-up"
                    ></i>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://mp.weixin.qq.com/s/yAsb_1h3ZjAaXtk5FQOBtg ">
                  <div class="title">
                    <div class="text">
                      惊！这些东西隔夜吃易中毒！快看你家有没有
                    </div>
                    <div class="img">
                      <el-image
                        src="../static/wechat/shijian/answer/3/news_ico9.png"
                        fit="contain"
                      ></el-image>
                    </div>
                  </div>
                  <div class="more">
                    <span>查看详细</span>
                    <i
                      class="el-select__caret el-input__icon el-icon-arrow-up"
                    ></i>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://mp.weixin.qq.com/s/te0Hb-TCPezj6A7t-OrKbQ">
                  <div class="title">
                    <div class="text">湿粉隐患多？马上检！</div>
                    <div class="img">
                      <el-image
                        src="../static/wechat/shijian/answer/3/news_ico10.png"
                        fit="contain"
                      ></el-image>
                    </div>
                  </div>
                  <div class="more">
                    <span>查看详细</span>
                    <i
                      class="el-select__caret el-input__icon el-icon-arrow-up"
                    ></i>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://mp.weixin.qq.com/s/TfR9nKY-rF-Ekxo1_cQ3lw">
                  <div class="title">
                    <div class="text">
                      我为群众办实事 |
                      网曝知名超市在售隔夜肉？市监部门突击连锁店发现...
                    </div>
                    <div class="img">
                      <el-image
                        src="../static/wechat/shijian/answer/3/news_ico11.png"
                        fit="contain"
                      ></el-image>
                    </div>
                  </div>
                  <div class="more">
                    <span>查看详细</span>
                    <i
                      class="el-select__caret el-input__icon el-icon-arrow-up"
                    ></i>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="close_button animate__animated animate__slideInUp"
          v-show="isShowCloseButton"
          @click="onCloseButton"
        >
          <el-image
            src="../static/wechat/shijian/answer/3/confirm_button.png?202108313"
          ></el-image>
        </div>
      </div>
    </div>
    <audio
      id="audio"
      controls
      autoplay="autoplay"
      loop="loop"
      src="../static/audio/music.mp3"
    ></audio>
  </div>
</template>
<script>
import {
  getOauth,
  getAnswer,
  getQuestion,
  pushSelect,
  goodLuck,
  getAwardLog,
} from "@/api/wechat";
import "@/styles/shijian-answer.scss";
import wx from "weixin-js-sdk";
export default {
  name: "Answer",
  components: {},
  data() {
    return {
      settingId: 3,
      isShowBgmask: false,
      isShowLoading: false,
      bgmaskIndex: 99,
      isShowIndex: true,
      isShowGameTips: true,
      isShowBackButton: false,
      isShowRuleButton: false,
      isShowLogButton: false,
      isShowTipsButton: false,
      isShowTips: false,
      tipsList: [],
      isShowGame: false,
      isShowAnswer: false,
      isShowWechatCash: false,
      isShowWechatCashFail: false,
      isShowWechatCashSuccess: false,
      isShowMsg: false,
      isShowCloseButton: true,
      isShowLuckButton: false,
      isShowNextButton: false,
      isShowCubeBox: false,
      isTextLeft: false,
      isShowTotal: false,
      isShowRule: false,
      ruleContent: "正在努力加载..",
      isShowAward: false,
      isShowNews: false,
      awardList: [],
      msgContent: "正在努力加载...",
      answerTips: "",
      wechatCredit: "null",
      wechatText: "null",
      setting: {},
      questionCategory: 1,
      answer_list: {},
      musicActive: 1,
      shakeStatus: false,
      totalShakeNum: 1,
      shakeNum: 1,
      stepNum: 1,
      isCubeZhuang: false,
      questionNum: 1,
      token: "token",
      GameTipsSize: "min",
      mainMax: false,
      questionToken: "",
      captchaToken: "",
    };
  },
  created() {
    document.title = "尚俭崇信，守护阳光下的盘中餐";
    this.token = localStorage.getItem("wxshijiantoken")
      ? localStorage.getItem("wxshijiantoken")
      : "token";
    this.stepNum = localStorage.getItem("wxshijianstep")
      ? localStorage.getItem("wxshijianstep")
      : parseInt(1);
    if (
      window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ==
      "micromessenger"
    ) {
      this.getUserinfo();
    } else {
      this.getCode();
    }
    if (window.outerHeight > 700) {
      this.GameTipsSize = "max";
      this.mainMax = true;
    }
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        var audioAuto = document.getElementById("audio");
        audioAuto.play();
      },
      false
    );
    // window.alert = function(name){
    //   var iframe = document.createElement("IFRAME");
    //   iframe.style.display="none";
    //   iframe.setAttribute("src", 'data:text/plain');
    //   document.documentElement.appendChild(iframe);
    //   window.frames[0].window.alert(name);
    //   iframe.parentNode.removeChild(iframe);
    // }
  },
  mounted() {
    // this.$nextTick(function(){  //页面加载完成后执行
    //   this.getUserinfo();
    // })
  },
  computed: {},
  methods: {
    onStratButton() {
      this.rule_button();
      this.initRoleXYZ();
    },
    onGameTips() {
      this.isShowGameTips = false;
    },
    onTotalButton() {
      this.isShowTotal = true;
    },
    onNewsButton() {
      this.isShowNews = true;
    },
    onCloseButton() {
      this.isShowWechatCash = false;
      this.isShowMsg = false;
      this.isShowTotal = false;
      this.isShowNews = false;
      this.isShowAward = false;
      this.isShowTips = false;
      this.isTextLeft = false;
      this.isShowBgmask = false;
      if (this.isShowAnswer == true) {
        this.isShowBgmask = true;
        this.bgmaskIndex = 99;
      }
      if (this.isShowRule == true) {
        this.isShowIndex = false;
        this.isShowRuleButton = true;
        this.isShowLogButton = true;
        this.isShowBackButton = true;
        this.isShowTipsButton = true;
        this.isShowGame = true;
        this.isShowCity = true;
        this.isShowRule = false;
      }
    },
    getUserinfo() {
      if (
        this.$route.query.code == null ||
        this.$route.query.code == undefined
      ) {
        if (
          this.token == null ||
          this.token == undefined ||
          this.token == "token"
        ) {
          this.getCode();
        } else {
          this.getAnswerSetting();
        }
      } else {
        getOauth({ code: this.$route.query.code })
          .then((response) => {
            if (response.data.status == 200) {
              this.getAnswerSetting();
            } else {
              this.getCode();
            }
          })
          .catch((error) => {
            console.log(error);
            //this.getUserinfo();
          });
      }
    },
    getAnswerSetting() {
      getAnswer({ id: this.settingId, token: this.token })
        .then((response) => {
          if (response.data.status == 200) {
            if (response.data.ip_status == 1) {
              this.setting = response.data.answer_setting;
              //wechat jssdk
              let that = this;
              setTimeout(function() {
                wx.config({
                  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: "wx8641dbc373d685fb", // 必填，公众号的唯一标识
                  timestamp: response.data.sign_package.timestamp, // 必填，生成签名的时间戳
                  nonceStr: response.data.sign_package.nonceStr, // 必填，生成签名的随机串
                  signature: response.data.sign_package.signature, // 必填，签名
                  jsApiList: [
                    "updateTimelineShareData",
                    "updateAppMessageShareData",
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    //'getLocation'//微信定位
                  ],
                });
                let share_data = {
                  title: response.data.answer_setting.share_title,
                  desc: response.data.answer_setting.share_desc,
                  link: response.data.answer_setting.share_link,
                  imgUrl: response.data.answer_setting.share_img,
                };
                wx.ready(function() {
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
              }, 1000);
              this.isShowLoading = false;
              this.isShowBgmask = false;
              localStorage.setItem("wxshijiantoken", response.data.token);
            } else {
              //其他信息提示
              this.setting.question_tips = "活动已经结束.";
              this.isShowLoading = false;
              this.isShowBgmask = true;
              this.isShowMsg = true;
              this.msgContent = response.data.msg;
              this.isShowCloseButton = false;
              this.isShowLuckButton = false;
            }
          } else {
            localStorage.removeItem("wxshijiantoken");
            this.getCode();
          }
        })
        .catch((error) => {
          console.log(error);
          //this.getUserinfo();
        });
    },
    getCode() {
      const local = window.location.href;
      const appid = "wx8641dbc373d685fb";
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
        local
      )}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
    },
    // getDistance(lat1,lng1,lat2,lng2){//比较两个不同经纬度之间的距离
    //   let radLat1 = lat1 * Math.PI / 180.0;
    //   let radLat2 = lat2 * Math.PI / 180.0;
    //   let a = radLat1 - radLat2;
    //   let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    //   let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    //   Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b/2),2)));
    //   s = s * 6378.137 ;// EARTH_RADIUS;
    //   s = Math.round(s * 10000) / 10000;
    //   console.log(s);
    //   return s;//km
    // },
    music_button() {
      let audioAuto = document.getElementById("audio");
      if (audioAuto.paused) {
        audioAuto.play();
        this.musicActive = 1;
      } else {
        audioAuto.pause();
        this.musicActive = 0;
      }
    },
    back_button() {
      this.isShowGame = false;
      this.isShowIndex = true;
      this.isShowBackButton = false;
      this.isShowRuleButton = false;
      this.isShowLogButton = false;
      this.isShowTipsButton = false;
    },
    rule_button() {
      this.ruleContent = this.setting.rules;
      this.isShowRule = true;
    },
    log_button() {
      this.isShowBgmask = true;
      this.isShowLoading = true;
      getAwardLog({ id: this.settingId })
        .then((response) => {
          if (response.data.status == 200) {
            this.isShowAward = true;
            this.awardList = response.data.award;
            this.isShowBgmask = false;
          } else {
            this.isShowMsg = true;
            this.isShowBgmask = true;
            this.msgContent = "您还没有中过奖喔，加油。";
          }
          this.isShowLoading = false;
        })
        .catch((error) => {
          this.msgContent = "您的网络好像有问题喔，请重新试下。4";
          this.isShowMsg = true;
          this.isShowBgmask = true;
          this.bgmaskIndex = 99;
          this.isShowLoading = false;
        });
    },
    tips_button() {
      this.isShowTips = true;
    },
    onNextButton() {
      if (this.questionNum < 5) {
        this.questionCategory = 2;
        this.questionNum++;
        this.isShowMsg = false;
        this.isShowAnswer = false;
        this.bgmaskIndex = 99;
        this.question();
      } else {
        this.questionCategory = 1;
        this.answerTips = "";
        this.isShowMsg = true;
        this.isShowAnswer = false;
        this.bgmaskIndex = 99;
        this.isShowCloseButton = false;
        this.isShowNextButton = false;
        this.isShowLuckButton = true;
        this.questionNum = 1;
        this.shakeStatus = false;
      }
    },
    question() {
      getQuestion({ id: this.settingId, category: this.questionCategory })
        .then((response) => {
          this.answer_list = response.question;
          this.isShowAnswer = true;
          this.isShowBgmask = true;
          this.questionToken = response.captcha;
        })
        .catch((error) => {
          this.msgContent = "您的网络好像有问题喔，请重新试下。1";
          this.isShowMsg = true;
        });
    },
    select(k) {
      this.isShowLoading = true;
      this.isShowBgmask = true;
      this.isShowCloseButton = false;
      this.isShowNextButton = false;
      this.isShowLuckButton = false;
      this.bgmaskIndex = 9999;
      pushSelect({
        id: this.settingId,
        qid: this.answer_list.id,
        aid: k,
        category: this.questionCategory,
        captcha: this.questionToken,
      })
        .then((response) => {
          this.isShowLoading = false;
          this.isShowMsg = true;
          this.answerTips = "答案解析：" + response.data.text;
          if (response.data.captcha) {
            this.captchaToken = response.data.captcha;
          }
          if (response.data.status == 1) {
            this.msgContent = "回答正确，继续加油！";
            this.isShowNextButton = true;
          } else {
            this.msgContent = "回答错误，继续加油！";
            this.isShowCloseButton = true;
          }
        })
        .catch((error) => {
          this.msgContent = "您的网络好像有问题喔，请重新试下。2";
          this.isShowMsg = true;
          this.isShowBgmask = true;
          this.bgmaskIndex = 99;
          this.isShowLoading = false;
        });
    },
    onLuckButton() {
      this.isShowBgmask = true;
      this.isShowLoading = true;
      goodLuck({ id: this.settingId, captcha: this.captchaToken })
        .then((response) => {
          if (response.data.success == 1) {
            this.isShowBgmask = true;
            this.wechatText = "恭喜您获得微信现金红包";
            this.wechatCredit = response.data.award.prize_credit;
            this.isShowWechatCashFail = false;
            this.isShowWechatCashSuccess = true;
            this.isShowMsg = false;
            this.isShowWechatCash = true;
          } else {
            this.isShowBgmask = true;
            this.wechatText = response.data.msg;
            this.wechatCredit = "空空如也";
            this.isShowWechatCashFail = true;
            this.isShowWechatCashSuccess = false;
            this.isShowWechatCash = true;
            this.isShowMsg = false;
          }
          this.isShowCloseButton = true;
          this.isShowLuckButton = false;
          this.isShowLoading = false;
        })
        .catch((error) => {
          this.msgContent = "您的网络好像有问题喔，请重新试下。3";
          this.isShowMsg = true;
          this.isShowBgmask = true;
          this.bgmaskIndex = 99;
          this.isShowLoading = false;
        });
    },
    initRoleXYZ() {
      let stepX, stepY;
      switch (parseInt(this.stepNum)) {
        case 1:
          stepX = 5;
          stepY = 130;
          break;
        case 2:
          stepX = 90;
          stepY = 90;
          break;
        case 3:
          stepX = 170;
          stepY = 40;
          break;
        case 4:
          stepX = 245;
          stepY = 0;
          break;
        case 5:
          stepX = 325;
          stepY = 40;
          break;
        case 6:
          stepX = 405;
          stepY = 90;
          break;
        case 7:
          stepX = 485;
          stepY = 130;
          break;
        case 8:
          stepX = 405;
          stepY = 180;
          break;
        case 9:
          stepX = 320;
          stepY = 230;
          break;
        case 10:
          stepX = 240;
          stepY = 270;
          break;
        case 11:
          stepX = 160;
          stepY = 230;
          break;
        case 0:
          stepX = 90;
          stepY = 170;
          break;
      }
      this.$refs.min_role.style.left = `${stepX}px`;
      this.$refs.min_role.style.top = `${stepY}px`;
      this.$refs.min_role.style.transform = `none`;
    },
    onShake() {
      if (this.shakeStatus == false) {
        this.shakeStatus = true; //骰子锁
        if (parseInt(this.totalShakeNum) % 2 == 0) {
          for (let i = 1; i <= 6; i++) {
            if ((this.stepNum + i) % 3 == 0) {
              this.shakeNum = i;
              break;
            }
          }
        } else {
          this.shakeNum = Math.ceil(Math.random() * 6);
          if (this.shakeNum <= 0) {
            //等于0的情况
            this.shakeNum = 1;
          }
        }
        this.random(this.shakeNum); //骰子效果
        this.totalShakeNum++;
      }
    },
    moveRole() {
      console.log("moveRole");
      let timer = setInterval(() => {
        if (this.stepNum == 12) {
          this.stepNum = 0;
        }
        if (this.shakeNum >= 1) {
          this.parabola(parseInt(this.stepNum) + 1);
          this.stepNum++;
          this.shakeNum--;
        } else {
          clearInterval(timer);
          if (this.stepNum % 3 == 0) {
            this.question();
          } else {
            this.isShowBgmask = true;
            this.isShowMsg = true;
            this.shakeStatus = false;
          }
          localStorage.setItem("wxshijianstep", parseInt(this.stepNum));
        }
        this.isShowCubeBox = false;
      }, 1000);
    },
    parabola(k) {
      console.log("parabola");
      // 抛物线计算公式 y = a*x*x + b*x + c
      // 坐标点x、y是已知的，a、b、c是未知的
      // 获取初始元素的位置
      let elX, elY, stepX, stepY;
      elX = this.$refs.min_role.offsetLeft;
      elY = this.$refs.min_role.offsetTop;
      // 获取初始元素到目标元素的偏移总量
      switch (parseInt(k)) {
        case 1:
          stepX = 5;
          stepY = 130;
          this.msgContent = "健康小Tips：有些鱼是不能食用的哦，如河豚鱼。";
          break;
        case 2:
          stepX = 90;
          stepY = 90;
          this.msgContent =
            "健康小Tips：蔬菜应该先洗后切，旺火快炒，才能更好保存蔬菜的维生素。";
          break;
        case 3:
          stepX = 170;
          stepY = 40;
          break;
        case 4:
          stepX = 245;
          stepY = 0;
          this.msgContent =
            "健康小Tips：虾的头部容易富集较多的重金属类物质，不建议食用。";
          break;
        case 5:
          stepX = 325;
          stepY = 40;
          this.msgContent =
            "健康小Tips：奶及奶制品中钙含量丰富，摄入后吸收率高，是膳食中天然钙的最佳来源。";
          break;
        case 6:
          stepX = 405;
          stepY = 90;
          //this.msgContent = "正常成年人每天应该食用300～500克蔬菜。"
          break;
        case 7:
          stepX = 485;
          stepY = 130;
          this.msgContent =
            "健康小Tips：常吃半生不熟的牛羊肉，有患上“布鲁氏杆菌病”的风险，因此要熟透再吃。";
          break;
        case 8:
          stepX = 405;
          stepY = 180;
          this.msgContent =
            "健康小Tips：鸡蛋一定要熟吃，吃生鸡蛋和半熟的鸡蛋、蛋黄未凝固的鸡蛋有潜在的危险。";
          break;
        case 9:
          stepX = 320;
          stepY = 230;
          break;
        case 10:
          stepX = 240;
          stepY = 270;
          this.msgContent =
            "健康小Tips：正常成年人每天应该食用200～250克水果。";
          break;
        case 11:
          stepX = 160;
          stepY = 230;
          this.msgContent =
            "健康小Tips：生鸡肉不需清洗即可烹饪。如果从心理上无法接受不清洗的话，建议浸泡在水里清洗，然后沥干或擦干。";
          break;
        case 12:
          stepX = 90;
          stepY = 170;
          //this.msgContent = "水果含有丰富的维生素、矿物质和膳食纤维。"
          break;
      }

      let diffX = stepX - elX;
      let diffY = stepY - elY;
      // 假设(elX,elY)为(0,0),则c = 0，求a、b
      // 设a=0.001 => 实际指焦点到准线的距离，可以抽象成曲率，这里模拟扔物体的抛物线，因此是开口向下的
      let a = 0.03;

      // 则 b = (y - a*x*x) / x
      let b = (diffY - a * diffX * diffX) / diffX;

      // 定义一个定时器，用来执行抛物线动画
      let timer = null;

      // 执行的时间
      let duration = 500;
      // 执行的开始时间
      let beginTime = new Date();
      // 结束的时间
      let endTime = +beginTime + duration;
      // 定时器，执行抛物线动画
      timer = setInterval(() => {
        let now = new Date();
        this.move(
          now,
          elX,
          elY,
          stepX,
          stepY,
          diffX,
          diffY,
          timer,
          beginTime,
          endTime,
          duration,
          a,
          b
        );
      }, 10);
    },
    move(
      now,
      elX,
      elY,
      stepX,
      stepY,
      diffX,
      diffY,
      timer,
      beginTime,
      endTime,
      duration,
      a,
      b
    ) {
      let x, y;
      if (now > endTime) {
        // 运行结束
        x = diffX;
        y = diffY;
        clearInterval(timer);
        console.log("end");
        this.$refs.min_role.style.left = `${stepX}px`;
        this.$refs.min_role.style.top = `${stepY}px`;
        this.$refs.min_role.style.transform = `none`;
      } else {
        // 计算每一步的X轴的位置
        x = diffX * ((now - beginTime) / duration);
        // 则每一步的Y轴的位置y = a*x*x + b*x + c;   c==0;
        y = a * x * x + b * x;
        this.$refs.min_role.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    },
    random(j) {
      console.log("random");
      let cube = this.$refs.cube;
      //cube.style.transition="1s all ease-in-out"
      let [x, y, z] = [360, 360, 360];
      //360 360 0 = 1
      //90 360 360 = 2
      //360 90 360 = 3
      //360 270 360 = 4
      //270 360 360 = 5
      //360 180 0 = 5
      switch (parseInt(j)) {
        case 1:
          z = 0;
          break;
        case 2:
          x = 90;
          break;
        case 3:
          y = 90;
          break;
        case 4:
          y = 270;
          break;
        case 5:
          x = 270;
          break;
        case 6:
          y = 180;
          z = 0;
          break;
      }
      this.isCubeZhuang = true;
      this.isShowCubeBox = true;
      setTimeout(() => {
        this.isCubeZhuang = false;
        cube.style.transform = `rotatex(${x}deg) rotatey(${y}deg) rotatez(${z}deg)scale3d(1,1,1)`;
        this.moveRole();
      }, 1000);
    },
  },
};
</script>
