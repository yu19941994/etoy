<template>
  <div class="home">
    <Banner></Banner>
    <h1 class="text-hide">ETOY拉庫</h1>
    <!-- text -->
    <div class="container mb-2 mb-lg-4">
      <section class="d-flex justify-content-center mt-lg-3">
          <img src="../../assets/image/title1.png" alt="" class="title1">
      </section>
      <span class="d-flex justify-content-center text-primary text-center">
          <p><b>拉庫小精靈有感於雙薪家庭的數量與日俱增，<br>
            逢年過節，想給家裡的小寶貝買禮物時，<br>
            總是要從大量的電商平台中挑選，<br>
            抑或是要舟車勞頓至實體商店購買。<br>
            購買到的禮物卻未必符合小寶貝的喜好。<br>
            <br>
            拉庫小精靈搜集了時下各年齡層最夯的玩具，<br>
            搭配最適合你家寶貝的關鍵字，<br>
            一指 Click 即可送到家，省時省力又包你滿意</b></p>
      </span>
    </div>

    <!-- character -->
    <div class="px-8 my-lg-2 character d-flex row justify-content-center no-gutters">
        <div class="col-md-6 col-lg-3 py-lg-5 py-3 text-center">
          <div>
            <img src="../../assets/image/character1.svg" alt="" class="ch-image align-items-center">
          </div>
          <button class="btn btn-outline-primary my-2" @click.prevent="openModalch1"><b>拉庫小精靈</b></button>
          <p class="text-fifth ch-t">掌管玩具的精靈</p>
        </div>
        <div class="col-md-6 col-lg-3 py-lg-5 py-3 text-center">
          <div>
            <img src="../../assets/image/character2.svg" alt="" class="ch-image align-items-center">
          </div>
          <button class="btn btn-outline-primary my-2" @click.prevent="openModalch2"><b>拉庫的媽媽</b></button>
          <p class="text-fifth ch-t">來了解玩具的好處</p>
        </div>
        <div class="col-md-6 col-lg-3 py-lg-5 py-3 text-center">
          <div>
            <img src="../../assets/image/character3.svg" alt="" class="ch-image align-items-center">
          </div>
          <button class="btn btn-outline-primary my-2" @click.prevent="openModalch3"><b>小幫手衛兵</b></button>
          <p class="text-fifth ch-t">退換貨找我</p>
        </div>
        <div class="col-md-6 col-lg-3 py-lg-5 py-3 text-center">
          <div>
            <img src="../../assets/image/character4.svg" alt="" class="ch-image align-items-center">
          </div>
          <button class="btn btn-outline-primary my-2" @click.prevent="openModalch4"><b>現況大法師</b></button>
          <p class="text-fifth ch-t">銷售排行歸我管</p>
        </div>
    </div>

    <!-- Modal1 -->
    <div class="modal fade" id="ch1Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content ch1Modal">
          <div class="modal-header bg-modal1 border-bottom-0 pb-0">
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body bg-modal1 text-center pb-4">
            <img src="../../assets/image/cave.png" alt="" width="250">
            <p class="text-forth h2" id="exampleModalLabel">About Me</p>
            <p class="text-forth modaltext">
                我叫拉庫，2020年創立了ETOY拉庫，<br>
                顧名思義就是 TOY 的 E-Commerce(玩具電商)<br>
                出生於兒童節，因此擁有赤子之心以及市場敏銳度，<br>
                想知道孩子喜歡什麼，問我就對了！<br>
            </p>
            <button class="btn btn-forth mb-2 text-modal1" @click.prevent="goShop1"><b>SHOP NOW</b></button>
          </div>
        </div>
      </div>
    </div>

     <!-- Moda2 -->
    <div class="modal fade" id="ch2Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content ch2Modal">
          <div class="modal-header bg-modal2 border-bottom-0 pb-0">
            <button type="button" class="close text-dark" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body bg-modal2 text-center pb-4">
            <img src="../../assets/image/train.png" alt="" width="180" class="my-4">
            <p class="text-dark h2" id="exampleModalLabel">Ｗhy Play Toys</p>
            <p class="text-dark modaltext">
                我是拉庫的媽媽，好奇我為什麼從小給拉庫玩玩具嗎？<br>
                其實啊，玩具的好處很多唷！<br>
                不僅能開發邏輯、語言、創意等多種能力<br>
                甚至能從親子共同玩玩具中，學習與人相處<br>
            </p>
            <button class="btn btn-forth mb-2 text-modal1"><b>看專家怎麼說</b></button>
          </div>
        </div>
      </div>
    </div>

     <!-- Moda3 -->
    <div class="modal fade" id="ch3Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content ch3Modal">
          <div class="modal-header bg-modal3 border-bottom-0 pb-0">
            <button type="button" class="close text-dark" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body bg-modal3 text-center pb-4">
            <img src="../../assets/image/fix.png" alt="" width="180" class="my-4">
            <p class="text-dark h2" id="exampleModalLabel">Returns & Refunds</p>
            <p class="text-dark modaltext">
                不小心買錯別擔心<br>
                玩具有瑕疵別害怕<br>
                我們有7天鑑賞期，<br>
                退換貨運費，本商家全程負擔<br>
            </p>
            <button class="btn btn-forth mb-2 text-modal1"><b>退換貨點此</b></button>
          </div>
        </div>
      </div>
    </div>

     <!-- Moda4 -->
    <div class="modal fade" id="ch4Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content ch4Modal">
          <div class="modal-header bg-modal4 border-bottom-0 pb-0">
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body bg-modal4 text-center pb-4">
            <img src="../../assets/image/rank.png" alt="" width="250">
            <p class="text-forth h2" id="exampleModalLabel">Ranking</p>
            <p class="text-forth modaltext">
                好奇現在的銷售排行嗎，嘿嘿嘿！<br>
                第1名：寶可夢球<br>
                第2名：黏黏怪物研究所<br>
                第3名：小小兵<br>
            </p>
            <button class="btn btn-forth mb-2 text-modal4" @click.prevent="goShop4"><b>SHOP NOW</b></button>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import $ from 'jquery'
import Banner from '../../components/front/banner';


export default {
  name: 'Home',
  components: {
    Banner,
  },
  methods: {
    openModalch1(){
      $('#ch1Modal').modal('show');
    },
    openModalch2(){
      $('#ch2Modal').modal('show');
    },
    openModalch3(){
      $('#ch3Modal').modal('show');
    },
    openModalch4(){
      $('#ch4Modal').modal('show');
    },
    goShop1(){
      $('#ch1Modal').modal('hide');
      const vm = this;
      vm.$router.push('/customerorders');
    },
    goShop4(){
      $('#ch4Modal').modal('hide');
      const vm = this;
      vm.$router.push('/customerorders');
    },
  }
}
</script>
