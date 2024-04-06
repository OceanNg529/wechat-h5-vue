<template>
  <div class="main" :class="{'main-max':mainMax}">
      <div class="bgmask" :style="{'z-index': bgmaskIndex}" v-show="isShowBgmask"></div>
      <div class="loading" v-show="isShowLoading"><el-image src="../static/wechat/shijian/answer/3/loading.svg"></el-image></div>
      <div class="msg" v-show="isShowMsg">
        <div class="box animate__animated animate__slideInDown">
          <div class="ico"><el-image src="../static/wechat/jiguan/survey/1/msg_ico.png"></el-image></div>
          <div class="content">
            {{ msgContent }}
          </div>
          <div class="close_button">
            <el-button type="primary" @click="onCloseButton">关闭</el-button>
          </div>
        </div>
      </div>
      <div class="wechat_cash" v-show="isShowWechatCash">
        <div class="box animate__animated animate__slideInDown">
          <div class="title">{{ wechatText }}</div>
          <div class="credit">{{ wechatCredit}}</div>
          <el-image src="../static/wechat/shijian/answer/3/wechat_cash.png?202108313"></el-image>
          <div class="fail" v-show="isShowWechatCashFail">
            <el-image src="../static/wechat/shijian/answer/3/wechat_cash_fail.png?202108313"></el-image>
          </div>
          <div class="success" v-show="isShowWechatCashSuccess">
            <el-image src="../static/wechat/shijian/answer/3/wechat_cash_success.png?20210908"></el-image>
          </div>
          <div class="close_button" @click="onCloseButton">
            <el-image src="../static/wechat/shijian/answer/3/confirm_button.png?202108313"></el-image>
          </div>
        </div>
      </div>
      <!-- <div class="copyright animate__animated animate__slideInUp"><el-image src="../static/wechat/jiguan/survey/1/copyright.png?20210918"></el-image></div> -->
      
      <div class="index" v-show="isShowIndex" style="background-image:url('../static/wechat/jiguan/survey/1/bg.jpg?20211020')">
          <div class="button">
              <div class="tongyi">
                    <el-checkbox label="我已阅读并同意" name="type" v-model="tongyi"></el-checkbox>
                    <span class="tiaokuan_button" @click="onTiaokuanButton">相关隐私条款</span>
              </div>
              <div class="start"><el-button type="primary" @click="onStratButton">开始答题</el-button></div>
          </div>
      </div>
      <div class="tiaokuan" v-show="isShowTiaokuan">
        <div class="box">
          <div class="ico animate__animated animate__slideInDown"><el-image src="../static/wechat/jiguan/survey/1/rule_ico.png"></el-image></div>
          <div class="content animate__animated animate__slideInDown">
            您好，很高兴您参与佛山市高明区锐道品牌策划有限公司的“深化模范机关创建·万人评作风”活动。本项目由中共佛山市高明区直属机关工作委员会发起，由本公司执行。我们和关联方可能需要您的手机号码、职业、居住地、IP地址等个人基本信息，用于您的身份核实以及后续可能进行的随访过程。您同意本授权告知书全部内容后才开始问卷调查。我们承诺:不会对外公开披露您的个人基本信息。
我们非常重视您的隐私保护和个人基本信息保护，为保证您的个人信息的安全，我们将尽量采用软件系统等电子化方式收集您的必要个人基本信息，同时在传输以及存储环节采用加密以及访问控制等技术措施保证数据安全。为了本项目的研究和分析，我们会在项目持续期和项目结束后的合理期间内妥善保存您的个人信息。超过上述保留期限后，我们会将您的个人信息永久性删除。
          </div>
          <div class="close_button animate__animated animate__slideInUp" @click="onCloseButton">
            <el-button type="primary" @click="onCloseButton">我知道了</el-button>
          </div>
        </div>
      </div>
      <div class="survey" v-show="isShowSurvey">
        <div class="progress">
          <el-progress :show-text="false" :stroke-width="20" :percentage="progress" status="success"></el-progress>
        </div>
        <div class="title">高明区“万人评作风”线上评议<span>已经完成{{ progress }}%</span></div>
        <div class="survey_page">
          <el-form ref="selectFrom" :rules="rules" :model="selectFrom">
            <div class="survey_box" v-show="surveyTotal == ++index" v-for="(s,index) in surveyList" :key="index">
              <!-- 单选 -->
              <el-form-item :ref="'survey' + index" :label="s.question + '【单选】'" :prop="'question' + index" v-if="s.type == 1">
                <el-radio-group v-model="selectFrom['question' + index]" @change="((value)=>{handleSelect(value,s.key,s.type)})">
                  <el-radio :label="k" v-for="(k,i) in parseInt(s.key)" :key="i">{{s['select' + k]}}<span class="tongji">{{s['total' + k]}}</span></el-radio>
                </el-radio-group>
                <div class="input_phone" :ref="'selectFromOther' + index" style="display:none">
                  <el-input placeholder="请输入手机号码." v-model="selectFromOther['question'+index]" class="phone">
                    <template slot="prepend">手机号码</template>
                    <el-button slot="append" icon="el-icon-mobile-phone" @click="onSendSMS">{{ phoneCodeTime}}</el-button>
                  </el-input>
                  <el-input placeholder="请输入手机验证码." v-model="selectFromCode" class="code">
                    <template slot="prepend">验 证 码</template>
                  </el-input>
                </div>
              </el-form-item>
               <!-- 多选 -->
              <el-form-item :ref="'survey' + index" :label="s.question+ '【多选】'" :prop="'question' + index" v-if="s.type == 2">
                <el-checkbox-group v-model="selectFrom['question' + index]" @change="((value)=>{handleSelect(value,s.key,s.type)})">
                  <el-checkbox :label="k" v-for="(k,i) in parseInt(s.key)" :key="i">{{s['select' + k]}}<span class="tongji">{{s['total' + k]}}</span></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <!-- 填空 -->
              <el-form-item :ref="'survey' + index" :label="s.question" :prop="'question' + index" v-if="s.type == 3">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 10}"
                  placeholder="请补充说明"
                  v-model="selectFrom['question' + index]">
                </el-input>
              </el-form-item>
              <!-- 填空&选择 -->
              <el-form-item :ref="'survey' + index" :label="s.question+ '【多选】'" :prop="'question' + index" v-if="s.type == 4 || s.type == 5">
                <el-checkbox-group v-model="selectFrom['question' + index]" :min="s.min" :max="s.max" @change="((value)=>{handleSelect(value,s.key,s.type)})">
                  <el-checkbox :label="k" v-for="(k,i) in parseInt(s.key)" :key="i">{{s['select' + k]}}<span class="tongji">{{s['total' + k]}}</span></el-checkbox>
                </el-checkbox-group>
                <el-input
                  type="textarea"
                  :ref="'QuestionOther' + index"
                  :autosize="{ minRows: 5, maxRows: 10}"
                  placeholder="请补充说明"
                  v-model="selectFromOther['question'+index]"
                  style="display:none"
                  >
                </el-input>
              </el-form-item>
            </div>
          </el-form> 
        </div>
        <div class="survey_button">
            <el-button type="primary" @click="onPrev">上一题</el-button>
            <el-button type="primary" @click="onNext" v-if="surveyTotal != 32">确定</el-button>
            <el-button type="primary" @click="onSubmit" v-else>完成提交</el-button>
        </div>
      </div>
      <div class="luckbox" v-show="isShowLuckBox">
        <div class="ico"><el-image src="../static/wechat/jiguan/survey/1/luckbox_ico.png"></el-image></div>
        <div class="title">您已经完成调查问卷，获得一次抽奖机会。</div>
        <div class="button"><el-button type="primary" @click="onLuckButton">点击抽奖</el-button></div>
      </div>
      <div class="overbox" v-show="isShowOverBox">
        <div class="ico"><el-image src="../static/wechat/jiguan/survey/1/msg_ico.png"></el-image></div>
        <div class="title">您已经完成调查问卷。</div>
        <div class="button"><el-button type="primary" @click="onOverButton">关闭</el-button></div>
      </div>
  </div>
</template>
<script>
import { getOauth,getSurvey,saveSurvey,luckdraw } from '@/api/survey';
import { sendSMS } from '@/api/sms';
import { validPhone } from '@/utils/validate';
import '@/styles/jiguan-survey.scss';
import wx from 'weixin-js-sdk';
export default {
  name: 'Survey',
  components: {},
  data() {
    return {
      settingId:1,
      isShowBgmask: true,
      isShowLoading: true,
      bgmaskIndex: 99,
      isShowIndex: true,
      isShowSurvey: false,
      isShowTiaokuan: false,
      isShowAliyunCaptcha:false,
      isShowLuckBox: false,
      isShowOverBox: false,
      tongyi:false,
      surveyList:[],
      surveyPage:1,
      surveyTotal:1,
      selectFrom:{
        question1:'',
        question2:'',
        question3:'',
        question4:'',
        question5:'',
        question6:'',
        question7:[],
        question8:[],
        question9:[],
        question10:[],
        question11:[],
        question12:[],
        question13:'',
        question14:[],
        question15:[],
        question16:[],
        question17:'',
        question18:'',
        question19:'',
        question20:'',
        question21:[],//1-3other
        question22:[],//1-3other
        question23:[],
        question24:'',
        question25:[],//1-3other
        question26:[],//other
        question27:[],//other
        question28:[],//1-3other
        question29:[],//1-3other
        question30:[],
        question31:'',
        question32:'',
      },
      selectFromOther:{
        question23:'',
        question25:'',
        question26:'',
        question27:'',
        question28:'',
        question29:'',
        question32:'',
      },
      selectFromCode:'',
      rules: {
        question1: [{ required: true, message: '', trigger: 'blur' }],
        question2: [{ required: true, message: '', trigger: 'blur' }],
        question3: [{ required: true, message: '', trigger: 'blur' }],
        question4: [{ required: true, message: '', trigger: 'blur' }],
        question5: [{ required: true, message: '', trigger: 'blur' }],
        question6: [{ required: true, message: '', trigger: 'blur' }],
        question7: [{ required: true, message: '', trigger: 'blur' }],
        question8: [{ required: true, message: '', trigger: 'blur' }],
        question9: [{ required: true, message: '', trigger: 'blur' }],
        question10: [{ required: true, message: '', trigger: 'blur' }],
        question11: [{ required: true, message: '', trigger: 'blur' }],
        question12: [{ required: true, message: '', trigger: 'blur' }],
        question13: [{ required: true, message: '', trigger: 'blur' }],
        question14: [{ required: true, message: '', trigger: 'blur' }],
        question15: [{ required: true, message: '', trigger: 'blur' }],
        question17: [{ required: true, message: '', trigger: 'blur' }],
        question18: [{ required: true, message: '', trigger: 'blur' }],
        question19: [{ required: true, message: '', trigger: 'blur' }],
        question20: [{ required: true, message: '', trigger: 'blur' }],
        question21: [{ required: true, message: '', trigger: 'blur' }],
        question22: [{ required: true, message: '', trigger: 'blur' }],
        question23: [{ required: true, message: '', trigger: 'blur' }],
        question24: [{ required: true, message: '', trigger: 'blur' }],
        question25: [{ required: true, message: '', trigger: 'blur' }],
        question26: [{ required: true, message: '', trigger: 'blur' }],
        question27: [{ required: true, message: '', trigger: 'blur' }],
        question28: [{ required: true, message: '', trigger: 'blur' }],
        question29: [{ required: true, message: '', trigger: 'blur' }],
        question30: [{ required: true, message: '', trigger: 'blur' }],
        question31: [{ required: true, message: '', trigger: 'blur' }],
        question32: [{ required: true, message: '', trigger: 'blur' }],
      },
      phoneCodeTime: '获取验证码',
      token: 'token',
      captcha: 'captcha',
      isShowWechatCash: false,
      isShowWechatCashFail: false,
      isShowWechatCashSuccess: false,
      isShowMsg: false,
      msgContent: '正在努力加载...',
      wechatCredit: 'null',
      wechatText: 'null',
      setting: {}
    }
  },
  created() {
    document.title = '高明区“万人评作风”线上评议';
    this.token = localStorage.getItem('wxjiguantoken')?localStorage.getItem('wxjiguantoken'):'token';
    if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger')
    {
      this.getUserinfo();
    }else{
      this.getUserinfo();
      // this.isShowBgmask = true;
      // this.isShowMsg = true;
      // this.msgContent = "请使用手机打开，效果体验更佳喔！";
      // this.isShowCloseButton = false;
      // this.isShowLuckButton = false;
    }
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
    progress(){
      return parseInt(this.surveyTotal / 32 * 100);
    },
  },
  methods:{
    onStratButton(){
      if(this.tongyi == false){
        this.isShowBgmask = true;
        this.isShowMsg = true;
        this.msgContent = '请阅读并同意相关隐私条款.';
      }else{
        this.isShowIndex = false;
        this.isShowSurvey = true;
      }
    },
    onTiaokuanButton(){
      this.isShowTiaokuan = true;
    },
    onCloseButton(){
      this.isShowWechatCash = false;
      this.isShowBgmask = false;
      this.isShowMsg = false;
      this.isShowTiaokuan = false;
    },
    onOverButton(){
      //这个可以关闭安卓系统的手机
      document.addEventListener('WeixinJSBridgeReady', function() {
          // eslint-disable-next-line no-undef
          WeixinJSBridge.call('closeWindow');
      }, false);
      //这个可以关闭ios系统的手机
      // eslint-disable-next-line no-undef
      WeixinJSBridge.call('closeWindow');
    },
    onPrev(){
      if(this.surveyTotal == 1){
        this.isShowBgmask = true;
        this.isShowMsg = true;
        this.msgContent = '已经是最前了.';
      }else{
        this.surveyTotal--;
      }
    },
    onNext(){
      //1
      if(this.selectFrom['question1'] == 2){
        this.msgContent = '感谢您的参与，欢迎您到高明来！';
        this.isShowBgmask = true;
        this.isShowMsg = true;
        return;
      }
      //身份选择
      // if(this.selectFrom['question2'] > 0){
      //   this.isShowBgmask = true;
      //   this.isShowLoading = true;
      //   getSurveyTotal().then(response => {
      //     let that = this;
      //     let n = 1;
      //     for(let i=2;i<=32;i++){
      //       Object.keys(response.data.select_total[i]).forEach(function(key){
      //         that.$set(that.surveyList[n],'total' + key,response.data.select_total[i][key]['total'+key]);
      //       });
      //       n++;
      //     }
      //     this.isShowBgmask = false;
      //     this.isShowLoading = false;
      //     console.log(this.surveyList)
      //     console.log(response.data.select_total);
      //   });
      // }
      //附加说明
      if((this.surveyTotal >= 25 && this.surveyTotal <= 29) || this.surveyTotal == 21 || this.surveyTotal == 22 || this.surveyTotal == 23){
        if(this.$refs['QuestionOther' + this.surveyTotal][0].$el.style.display == "block" && this.isEmpty(this.selectFromOther['question' + this.surveyTotal])){
          this.msgContent = '请补充说明.';
          this.isShowBgmask = true;
          this.isShowMsg = true;
          return;
        }
      }
      //至少选择3题
      if(this.surveyTotal == 21 || this.surveyTotal == 22){
        if(this.selectFrom['question' + this.surveyTotal].length != 3){
          this.msgContent = '请完成选题，至少勾选3个选项.';
          this.isShowBgmask = true;
          this.isShowMsg = true;
          return;
        }
      }
      //选择1-3题,最多选择3题
      if(this.surveyTotal == 25 || this.surveyTotal == 28 || this.surveyTotal == 29){
        if(this.selectFrom['question' + this.surveyTotal].length < 1 || this.selectFrom['question' + this.surveyTotal].length > 3){
          this.msgContent = '请完成选题才可以进入下一题.';
          this.isShowBgmask = true;
          this.isShowMsg = true;
          return;
        }
      }
      //填空题
      if(this.surveyTotal == 24 || this.surveyTotal == 31){
        if(this.isEmpty(this.selectFrom['question' + this.surveyTotal])){
          this.msgContent = '请补充说明.';
          this.isShowBgmask = true;
          this.isShowMsg = true;
          return;
        }
      }
      //单选或多选
      if(this.selectFrom['question' + this.surveyTotal].length < 1 || this.selectFrom['question' + this.surveyTotal] == 0){
        this.msgContent = '请完成选题才可以进入下一题.';
        this.isShowBgmask = true;
        this.isShowMsg = true;
        return;
      }
      this.surveyTotal++;
    },
    handleSelect(value,key,type){
      //附加题+反选
      if(type == 5){
        let index = this.selectFrom['question' + this.surveyTotal].indexOf(parseInt(key-1))
        if(index !== -1){//是否为最后一项
          this.selectFrom['question' + this.surveyTotal] = [parseInt(key-1)];
        }
        if(this.selectFrom['question' + this.surveyTotal].indexOf(parseInt(key)) !== -1){
          this.$refs['QuestionOther' + this.surveyTotal][0].$el.style.display = "block";
        }else{
          this.$refs['QuestionOther' + this.surveyTotal][0].$el.style.display = "none";
        }
      }
      //选项 未遇到过
      if(type == 2){
        let index = this.selectFrom['question' + this.surveyTotal].indexOf(parseInt(key))
        if(index !== -1){//是否为最后一项
          this.selectFrom['question' + this.surveyTotal] = [parseInt(key)];
        }
      }
      //附加题
      if(type == 4){
        if(this.selectFrom['question' + this.surveyTotal].indexOf(parseInt(key)) !== -1){
          this.$refs['QuestionOther' + this.surveyTotal][0].$el.style.display = "block";
        }else{
          this.$refs['QuestionOther' + this.surveyTotal][0].$el.style.display = "none";
        }
      }
      //手机号码
      if(this.surveyTotal == 32){
        if(value == 1){
          this.$refs['selectFromOther' + this.surveyTotal][0].style.display = "inline-table";
        }else{
          this.$refs['selectFromOther' + this.surveyTotal][0].style.display = "none";
        }
      }
    },
    onSendSMS(){
      if(this.phoneCodeTime == "获取验证码"){
        if(!validPhone(this.selectFromOther.question32)){
          this.msgContent = '手机号码格式错误，请核对一下.';
          this.isShowBgmask = true;
          this.isShowMsg = true;
        }else{
          this.isShowBgmask = true;
          this.isShowLoading = true;
          sendSMS({phone:this.selectFromOther.question32}).then(response=>{
            if(response.data.code == 200){
              let that = this;
              this.phoneCodeTime = parseInt(60);
              let phonecodetime = setInterval(function(){
                that.phoneCodeTime--;
                if(that.phoneCodeTime <= 0){
                  clearInterval(phonecodetime);
                  that.phoneCodeTime = "获取验证码";
                }
              },1000)
              this.isShowBgmask = false;
              this.isShowLoading = false;
            }else{
              this.isShowBgmask = true;
              this.isShowLoading = false;
              this.isShowMsg = true;
              this.msgContent = response.data.msg;
            }
          }).catch((error)=>{
            this.isShowBgmask = true;
            this.isShowMsg = true;
            this.msgContent = "网络错误，请重试.";
          })
        }
      }
    },
    onSubmit(){
      if(this.$refs['selectFromOther32'][0].style.display == "inline-table" && (this.selectFromCode.length == '' || this.selectFromCode.length == null || this.selectFromCode.length == "undefined")){
        this.msgContent = '手机号码或验证码不能为空喔.';
        this.isShowBgmask = true;
        this.isShowMsg = true;
        return;
      }
      this.isShowBgmask = true;
      this.isShowLoading = true;
      this.$refs['selectFrom'].validate((valid) => {
        if (valid) {
          saveSurvey({ id:this.settingId, data:this.selectFrom, other:this.selectFromOther, code:this.selectFromCode, captcha:this.captcha }).then(response => {
            if(response.data.status == 200){
              this.isShowSurvey = false;
              this.isShowBgmask = false;
              this.isShowLoading = false;
              this.captcha = response.data.captcha;
              if(response.data.luckdraw == 1){
                this.isShowLuckBox = true;
              }else{
                this.isShowOverBox = true;
              }
            }else{
              this.isShowLoading = false;
              this.isShowBgmask = true;
              this.isShowMsg = true;
              this.msgContent = response.data.msg;
            }
          }).catch((error) => {
            this.isShowBgmask = true;
            this.isShowMsg = true;
            this.isShowLoading = false;
            this.msgContent = "网络错误，请重新提交.";
          })
        } else {
          this.isShowBgmask = true;
          this.isShowMsg = true;
          this.isShowLoading = false;
          this.msgContent = "有漏选填的喔.请审阅清楚.";
        }
      })
    },
    getUserinfo(){
      if(this.$route.query.code == null || this.$route.query.code == undefined){
        if(this.token == null || this.token == undefined || this.token == 'token'){
          this.getCode();
        }else{
          this.getSurveySetting();
        }
      }else{
        getOauth({ code: this.$route.query.code }).then(response => {
          if(response.data.status == 200){
            this.getSurveySetting();
          }else{
            this.getCode();
          }
        }).catch((error) => {
          console.log(error)
          //this.getUserinfo();
        })
      }
		},
    getSurveySetting(){
      getSurvey({ id:this.settingId, token:this.token }).then(response => {
        if(response.data.status == 200){
          if(response.data.ip_status == 1){
            this.captcha = response.data.captcha;
            this.setting = response.data.survey_setting;
            this.surveyList = response.data.survey_question;
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
                  'hideOptionMenu',
                  //'getLocation'//微信定位
                ]
              });
              let share_data = {
                title: response.data.survey_setting.share_title,
                desc: response.data.survey_setting.share_desc,
                link: response.data.survey_setting.share_link,
                imgUrl: response.data.survey_setting.share_img
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
                //   fail: err => {
                //     // that.isShowBgmask = true;
                //     // that.isShowMsg = true;
                //     // that.msgContent = '获取定位失败，请开启微信定位授权.';
                //     // that.isShowCloseButton = false;
                //     // that.isShowLuckButton = false;
                //   }
                //});
              });
            },1000)
            this.isShowLoading = false;
            this.isShowBgmask = false;
            localStorage.setItem('wxjiguantoken',response.data.token)
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
          localStorage.removeItem('wxjiguantoken');
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
    isEmpty(obj){
      if(typeof obj == "undefined" || obj == null || obj == ""){
          return true;
      }else{
          return false;
      }
    },
    // getDistance(lat1,lng1,lat2,lng2){//比较两个不同经纬度之间的距离
    //     let radLat1 = lat1 * Math.PI / 180.0;
    //     let radLat2 = lat2 * Math.PI / 180.0;
    //     let a = radLat1 - radLat2;
    //     let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    //     let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    //     Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b/2),2)));
    //     s = s * 6378.137 ;// EARTH_RADIUS;
    //     s = Math.round(s * 10000) / 10000;
    //     console.log(s);
    //     return s;//km
    // },
    onLuckButton(){
      this.isShowBgmask = true;
      this.isShowLoading = true;
      //this.isShowAliyunCaptcha = true;
      luckdraw({ id:this.settingId, captcha:this.captcha }).then(response => {
        if(response.data.success == 1){
          this.isShowBgmask = true;
          this.wechatText = '恭喜您获得微信现金红包';
          this.wechatCredit = response.data.award.prize_credit;
          this.isShowWechatCashFail = false;
          this.isShowWechatCashSuccess = true;
          this.isShowMsg = false;
          this.isShowWechatCash = true;
        }else{
          this.isShowBgmask = true;
          this.wechatText = response.data.msg;
          this.wechatCredit = '空空如也';
          this.isShowWechatCashFail = true;
          this.isShowWechatCashSuccess = false;
          this.isShowWechatCash = true;
          this.isShowMsg = false;
        }
        this.isShowOverBox = true;
        this.isShowLuckBox = false;
        this.isShowLoading = false;
      }).catch((error) => {
        this.isShowBgmask = true;
        this.wechatText = '好可惜!没有抽中.';
        this.wechatCredit = '空空如也';
        this.isShowWechatCashFail = true;
        this.isShowWechatCashSuccess = false;
        this.isShowWechatCash = true;
        this.isShowMsg = false;
        this.isShowOverBox = true;
        this.isShowLuckBox = false;
        this.isShowLoading = false;
      })
    }
  }
}
</script>
