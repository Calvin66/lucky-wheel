<template>
  <div class="lucky-wheel">
    <img
      class="title-img"
      src="../assets/title.png"
      alt=""
    >
    <div class="wheel-canvas-container">
      <canvas
        id="wheelCanvas"
        width="300px"
        height="300px"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LuckyWheel',
  data() {
    return {
      rewardNames: [
        {
          id: 1,
          title: '10元现金',
          images: '../assets/prize.png',
          color: '#FFF4D7'
        },
        {
          id: 2,
          title: '100元代金券',
          images: '../assets/prize.png',
          color: '#FFFFFF'
        },
        {
          id: 3,
          title: '30元现金',
          images: '../assets/prize.png',
          color: '#FFF4D7'
        },
        {
          id: 4,
          title: '200元代金券',
          images: '../assets/prize.png',
          color: '#FFFFFF'
        },
        {
          id: 5,
          title: '300元现金',
          images: '../assets/prize.png',
          color: '#FFF4D7'
        },
        {
          id: 6,
          title: '210元代金券',
          images: '../assets/prize.png',
          color: '#FFFFFF'
        }
      ],
      outsideRadius: 150, // 转盘外圆的半径
      textRadius: 115, // 转盘奖品位置距离圆心的距离
      insideRadius: 38, // 转盘内圆的半径
      startAngle: 0, // 开始角度
      isRun: false
    };
  },
  mounted() {
    this.initWhell();
  },
  methods: {
    initWhell() {
      const canvas = document.getElementById('wheelCanvas');
      const ctx = canvas.getContext('2d');
      const baseAngle = Math.PI * 2 / (this.rewardNames.length);
      // 如果奖品名字太长,分行的行距
      const line_height = 25;
      const canvasW = canvas.width; // 画板的高度
      const canvasH = canvas.height; // 画板的宽度
      // 在给定矩形内清空一个矩形
      ctx.clearRect(0, 0, canvasW, canvasH);

      // strokeStyle 选定画笔颜色
      ctx.strokeStyle = '#FFBE04'; // 红色
      // font 画布上文本内容的当前字体属性
      ctx.font = '16px Microsoft YaHei';
      for (let i = 0; i < this.rewardNames.length; i++) {
        // 当前的角度
        const angle = this.startAngle + i * baseAngle;
        // 填充颜色
        ctx.fillStyle = this.rewardNames[i].color;
        ctx.beginPath();
        /*
         * 画圆弧，和IOS的Quartz2D类似
//       * context.arc(x,y,r,sAngle,eAngle,counterclockwise);
         * x :圆的中心点x
         * y :圆的中心点x
         * sAngle,eAngle :起始角度、结束角度
         * counterclockwise : 绘制方向,可选，False = 顺时针，true = 逆时针
         * */

        ctx.arc(canvasW * 0.5, canvasH * 0.5, this.outsideRadius, angle, angle + baseAngle, false);
        ctx.arc(canvasW * 0.5, canvasH * 0.5, this.insideRadius, angle + baseAngle, angle, true);
        ctx.stroke();
        ctx.fill();
        // 保存画布的状态，和图形上下文栈类似，后面可以Restore还原状态（坐标还原为当前的0，0），
        ctx.save();

        //      重新选取颜色
        ctx.fillStyle = '#E5302F';
        const rewardName = this.rewardNames[i].title;
        // const rewardImg = this.rewardNames[i].images
        const translateX = canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * this.textRadius;
        const translateY = canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * this.textRadius;
        ctx.translate(translateX, translateY);

        //      将画布旋转一定角度然后开始填充字
        ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);
        // 根据奖品名称决定要不要分行
        if (this.rewardNames[i].title.length > 8) {
          const newName = this.rewardNames[i].title.substring(0, 8) + ',' + this.rewardNames[i].title.substring(8);
          const nameArr = newName.split(',');
          for (let j = 0; j < nameArr.length; j++) {
            ctx.fillText(nameArr[j], -ctx.measureText(nameArr[j]).width / 2, j * line_height);
          }
        } else {
          ctx.fillText(rewardName, -ctx.measureText(this.rewardNames[i]).width / 2, 0);
        }
        const wheelImg = new Image();
        wheelImg.src = require('../assets/prize.png');
        wheelImg.onload = function() {
          ctx.drawImage(wheelImg, -15, 5);
        };
        ctx.drawImage(wheelImg, -15, 5);
        ctx.restore();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.lucky-wheel {
  height: 100%;
  width: 100%;
  text-align: center;
  background: url("../assets/bg.jpg") no-repeat;
  background-size: 100%;
  .title-img {
    width: 80%;
    margin-top: 50px;
  }
  .wheel-canvas-container {
    position: relative;
  }
}
</style>
