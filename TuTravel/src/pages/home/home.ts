import { Component, ViewChild, Input } from '@angular/core';
import { NavController , ModalController, ViewController, LoadingController } from 'ionic-angular';

declare var google:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('map') mapElement;

  places: any;
  autocompletePlace: any;
  autocompletePlaces: any;
  map: any;
  marker: any;

  pathNgv1A: any;
  pathNgv1B: any;
  pathNgv2: any;
  pathNgv3: any;
  pathNgv4: any;

  drawPathNgv1A: any;
  drawPathNgv1B: any;
  drawPathNgv2: any;
  drawPathNgv3: any;
  drawPathNgv4: any;

  color1A: string;
  background1A: string;
  borderColor1A: string;

  color1B: string;
  background1B: string;
  borderColor1B: string;

  color2: string;
  background2: string;
  borderColor2: string;

  color3: string;
  background3: string;
  borderColor3: string;

  color4: string;
  background4: string;
  borderColor4: string;


  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {

    this.color1A = '#6200EA';
    this.background1A = 'white';
    this.borderColor1A = '#6200EA';

    this.color1B = '#0091EA';
    this.background1B = 'white';
    this.borderColor1B = '#0091EA';

    this.color2 = '#00C853';
    this.background2 = 'white';
    this.borderColor2 = '#00C853';

    this.color3 = '#FF6D00';
    this.background3 = 'white';
    this.borderColor3 = '#FF6D00'; 

    this.color4 = '#263238';
    this.background4 = 'white';
    this.borderColor4 = '#263238';


    this.places = [
      { 
        name : "อาคารโดมบริหาร" , 
        positionPlace : { lat : 14.073586 , lng : 100.602949 },  
        ngv : [ "1A" , "1B" , "2" , "3" , "4" ],
        label : "ป้ายตรงข้ามโรงอาหารกรีน"
      },
      { 
        name : "วงเวียนสถาบันเอชียตะวันออก" , 
        positionPlace : { lat : 14.074836 , lng : 100.601619 },
        ngv : [ "1A" , "1B" , "2" , "3" , "4" ],
        label : "ป้ายสถาบันเอเชียตะวันออก"
      },
      { 
        name : "สถาบันเอเชียตะวันออก" , 
        positionPlace : { lat : 14.074828 , lng : 100.600345 }, 
        ngv : [ "1A" , "1B" , "2" , "3" , "4" ],
        lable : "ป้ายสถาบันเอเชียตะวันออก"
      },
      { 
        name : "โรงอาหารกรีน" , 
        positionPlace: { lat : 14.073313 , lng : 100.601182 },
        ngv : [ "1A" , "1B" , "2" , "3" , "4" ],
        lable : "ป้ายโรงอาหารกรีน" 
      }
    ];



    this.autocompletePlaces = [];
    this.autocompletePlace = {
      name: '',
      position: null
    };

  }


  ionViewDidLoad(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present().then(() => {
      this.initMap();
      
      loader.dismiss();
    });
  }

  initMap(){

  	let centerLatLng = new google.maps.LatLng( 14.07000, 100.605346);

  	let mapOption = {

  		center: centerLatLng,
  		zoom: 14,
      maxZoom: 20,
      minZoom: 1,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      zoomControl: false,
      mapTypeId: 'roadmap'

  	};
  	this.map =  new google.maps.Map(this.mapElement.nativeElement, mapOption);

    this.pathNgv1B  = [
      { lat : 14.06738 , lng : 100.609656 },
      { lat : 14.067388 , lng : 100.608944 }, // จุดจอดหน้าคณะสถาปัตยกรรม
      { lat : 14.067408 , lng : 100.607471 },
      { lat : 14.067441 , lng : 100.60587 }, // จุดจอดหน้าสถานีน้ำมันปตท.
      { lat : 14.067447 , lng : 100.603958 }, // จุดจอดหน้ายิมเนเซียม 6
      { lat : 14.067449 , lng : 100.603199 }, // จุดจอดหน้ายิมเนเซียม 4, จุดจอดหน้าคณะรัฐศาสตร์
      { lat : 14.067473 , lng : 100.601785 },
      { lat : 14.067523 , lng : 100.601699 },
      { lat : 14.067594 , lng : 100.601658 },
      { lat : 14.067802 , lng : 100.601638 },
      { lat : 14.069541 , lng : 100.601654 }, // จุดจอดหน้าคณะศิลปศาสตร์ , ป้ายรถเมล์หน้าอาคารเรียนรวม SC , ป้ายเล็กจุดจอดทางมา้ลายตรงข้ามอาคารเรียนรวม SC (ติดจุดเบอร์ 11)
      { lat : 14.070234 , lng : 100.601639 },
      { lat : 14.070469 , lng : 100.60162 },
      { lat : 14.07046 , lng :100.601203  }, // ป้ายหน้ายิมเนเซียม 7
      { lat : 14.070433 , lng : 100.598808 },
      { lat : 14.070475 , lng : 100.598671 },
      { lat : 14.070567 , lng : 100.598619 },
      { lat : 14.071163 , lng : 100.598609 },
      { lat : 14.071208 , lng : 100.598588 },
      { lat : 14.071241 , lng : 100.598499 },
      { lat : 14.07123 , lng : 100.597946 }, // ป้ายหน้าอาคารหอพัก 14 ชั้น
      { lat : 14.071209 , lng : 100.597357 },
      { lat : 14.071537 , lng : 100.597343 },
      { lat : 14.071818 , lng : 100.597231 }, // หอพักนักกีฬาโซน C C7
      { lat : 14.072395 , lng : 100.596989 }, // หอพักนักกีฬาโซน C C6
      { lat : 14.072806 , lng : 100.596823 },
      { lat : 14.07296 , lng : 100.596764 },
      { lat : 14.073331 , lng : 100.596739 }, // หอพักนักกีฬาโซน C C5
      { lat : 14.074791 , lng : 100.596686 }, // หอพักนักกีฬาโซน C C2 C3 C4
      { lat : 14.075883 , lng : 100.59666 }, // หอพักนักกีฬาโซน C C1
      { lat : 14.07626 , lng : 100.596645 },
      { lat : 14.07629 , lng : 100.596233 },
      { lat : 14.076339 , lng : 100.595939 },
      { lat : 14.076443 , lng : 100.595642 }, // ป้ายเล็กจุดจอดหน้าโรงอาหารอินเตอร์โซน
      { lat : 14.076641 , lng : 100.595343 },
      { lat : 14.076875 , lng : 100.59516 },
      { lat : 14.077109 , lng : 100.59501 },
      { lat : 14.07731 , lng : 100.594948 },
      { lat : 14.077336 , lng : 100.594813 },
      { lat : 14.077445 , lng : 100.594675 },
      { lat : 14.077653 , lng : 100.594616 },
      { lat : 14.077851, lng : 100.594672 },
      { lat : 14.077921 , lng : 100.594766 },
      { lat : 14.07796 , lng : 100.594935 },
      { lat : 14.077874 , lng : 100.595072 },
      { lat : 14.077739 , lng : 100.595182  },
      { lat : 14.077609 , lng : 100.5952 },
      { lat : 14.077409 , lng : 100.595141 },
      { lat : 14.077346 , lng : 100.595056 },
      { lat : 14.077148 , lng : 100.595115 },
      { lat : 14.076966 , lng : 100.595211 },
      { lat : 14.076753 , lng : 100.595377 },
      { lat : 14.076521 , lng : 100.595694 }, // ป้ายหน้าหมู่บ้านนักกีฬาโซน B
      { lat : 14.076446 , lng : 100.595892 },
      { lat : 14.076371 , lng : 100.596179 },
      { lat : 14.076347 , lng : 100.596517 },
      { lat : 14.076316 , lng : 100.597404 }, // ป้ายหน้าโรงยิมอินเตอร์โซน
      { lat : 14.076282 , lng : 100.597858 },
      { lat : 14.076332 , lng : 100.597934 },
      { lat : 14.076321 , lng : 100.598001 },
      { lat : 14.076283 , lng : 100.598046 },
      { lat : 14.076144 , lng : 100.600018 }, // ป้ายหน้าโรงเรียนประถมศึกษาธรรมศาสตร์ , ป้ายสามแยกเข้าลานจอดรถหมู่บ้านนักกีฬาโซน B
      { lat : 14.076048 , lng : 100.601605 },
      { lat : 14.075465 , lng : 100.601614 }, // ป้ายรถเมล์หน้าสวทช. , จุดจอดท่ารถตู้
      { lat : 14.074924 , lng : 100.601614 },
      { lat : 14.07489 , lng : 100.601686 },
      { lat : 14.07479 , lng : 100.601694 },
      { lat : 14.074754 , lng : 100.601651 },
      { lat : 14.074743 , lng : 100.601624 },
      { lat : 14.074697 , lng : 100.601624 }, // ป้ายวงเวียนหน้าศูนย์ญี่ปุ่น
      { lat : 14.073837 , lng : 100.601632  }, // ป้ายหน้าศูนย์ธุรกิจและบริการ, จุดจอดหน้าสำนักงานอธิการบดีตรงข้ามอาคารศูนย์ธุรกิจแลับริการ
      { lat : 14.072877 , lng : 100.601647 }, // ป้ายรถเมล์หน้าโรงอาหารกลาง
      { lat : 14.071126 , lng : 100.601651 }, // จุดจอดหน้าหอสมุดป๋วย
      { lat : 14.070454 , lng : 100.601654 },
      { lat : 14.070241 , lng : 100.60167 },
      { lat : 14.070238 , lng : 100.603228 }, // สำนักทะเบียน
      { lat : 14.070225 , lng : 100.604237 },
      { lat : 14.069727 , lng : 100.604253 }, // โรงอาหาร SC 2
      { lat : 14.069204 , lng : 100.604266 },
      { lat : 14.069101 , lng : 100.604284 },
      { lat : 14.069062 , lng : 100.604384 },
      { lat : 14.069057 , lng : 100.604639 }, // โรงอาหาร SC 1
      { lat : 14.069055 , lng : 100.605245 },
      { lat : 14.069003 , lng : 100.605351 },
      { lat : 14.068898 , lng : 100.605393 },
      { lat : 14.068336 , lng : 100.605387 }, // โรงละคร
      { lat : 14.067479 , lng : 100.605412 },
      { lat : 14.067482 , lng : 100.605825 }, // จุดจอดหน้าสถานีน้ำมันปตท.
      { lat : 14.067439 , lng : 100.607394 },
      { lat : 14.067415 , lng : 100.608979 }, // จุดจอดหน้าคณะะสถาปัตยกรรม
      { lat : 14.067413 , lng : 100.609601 }
    ];

    this.pathNgv1A = [ 
      { lat : 14.067386 , lng : 100.609451 },
      { lat : 14.067393 , lng : 100.6089 }, //จุดจอดหน้าคณะสถาปัตยกรรม
      { lat : 14.067412 , lng : 100.607463 },
      { lat : 14.067453 , lng : 100.605775 }, // จุดจอดหน้าสถานีน้ำมันปตท.
      { lat : 14.067447 , lng : 100.605401 }, 
      { lat : 14.068304 , lng : 100.605389 }, // โรงละคร
      { lat : 14.068923 , lng : 100.605389 },
      { lat : 14.069004 , lng : 100.605345 },
      { lat : 14.069052 , lng : 100.605258 },
      { lat : 14.069062 , lng : 100.604591 }, // โรงอาหาร Sc 1/JC
      { lat : 14.069074 , lng : 100.604331 },
      { lat : 14.069118 , lng : 100.604272 },
      { lat : 14.069207 , lng : 100.604264 },
      { lat : 14.069809 , lng : 100.604242 }, // โรงอาหาร SC2
      { lat : 14.070242 , lng : 100.604239 },
      { lat : 14.070236 , lng : 100.603252 }, // สำนักทะเบียน
      { lat : 14.070236 , lng : 100.601635 },
      { lat : 14.070972 , lng : 100.601627 }, // จุดจอดหน้าหอสมุดป๋วย
      { lat : 14.072863 , lng : 100.601622 }, // ป้ายรถเมล์หน้าโรงอาหารกลาง
      { lat : 14.07386 , lng : 100.601603 }, // ป้ายหน้าศูนย์ธุรกิจและบริการ, จุดจอดหน้าสำนักงานอธิการบดีตรงข้ามอาคารศูนย์ธุรกิจแลับริการ
      { lat : 14.074729 , lng : 100.60161 },  // ป้ายวงเวียนหน้าศูนย์ญี่ปุ่น
      { lat : 14.074753 , lng : 100.601609 },
      { lat : 14.074768 , lng : 100.601563 },
      { lat : 14.074807 , lng : 100.60153 },
      { lat : 14.074871 , lng : 100.601532 },
      { lat : 14.074923 , lng : 100.601609 },
      { lat : 14.075467 , lng : 100.601612 }, // จุดจอดท่ารถตู้, ป้ายรถเมล์หน้าสวทช
      { lat : 14.07595 , lng : 100.60161 },
      { lat : 14.076025 , lng : 100.600664 },// ป้ายหน้าตึกกิจกรรมนักศึกษา
      { lat : 14.076043 , lng : 100.600272 }, // ป้ายสามแยกเข้าลานจอดนถหมู่บ้านนักกีฬาโซน B***
      { lat : 14.076061 , lng : 100.599811 }, // ป้ายหน้าโรงเรียนประถมศึกษาธรรมศาสตร์***
      { lat : 14.076134 , lng : 100.598762 }, // ป้ายตรงข้ามโรงเรียนอนุบาลธรรมศาสตร์
      { lat : 14.076179 , lng : 100.59804 },
      { lat : 14.076147 , lng : 100.598004 },
      { lat : 14.076137 , lng : 100.597946 },
      { lat : 14.076154 , lng : 100.597895 },
      { lat : 14.076198 , lng : 100.597857 },
      { lat : 14.076216 , lng : 100.597347 }, // ป้ายตรงข้าม 7-11 อินเตอร์โซน
      { lat : 14.076285 , lng : 100.596255 },
      { lat : 14.076345 , lng : 100.595918 },
      { lat : 14.076445 , lng : 100.595631 }, // ป้ายเล็กจุดจอดหน้าโรงอาหารอิินเตอร์โซน
      { lat : 14.076644 , lng : 100.595334 },
      { lat : 14.077072 , lng : 100.595033 },
      { lat : 14.077315 , lng : 100.594946 },
      { lat : 14.077319 , lng : 100.594878 },
      { lat : 14.077364 , lng : 100.594775 },
      { lat : 14.077442 , lng : 100.594681 },
      { lat : 14.077591 , lng : 100.594621 },
      { lat : 14.07773 , lng : 100.594626 },
      { lat : 14.077878 , lng : 100.59471 },
      { lat : 14.077911 , lng : 100.594749 },
      { lat : 14.077951 , lng : 100.594874 }, // ป้ายวงเวียนหมู่บ้านนักกีฬา
      { lat : 14.077958 , lng : 100.594946 },
      { lat : 14.077915 , lng : 100.595043 },
      { lat : 14.077811 , lng : 100.595143 },
      { lat : 14.077703 , lng : 100.595194 },
      { lat : 14.07761 , lng : 100.595204 },
      { lat : 14.077511 , lng : 100.595191  },
      { lat : 14.077415 , lng : 100.595139 },
      { lat : 14.077347 , lng : 100.595054 },
      { lat : 14.077149 , lng : 100.595115 },
      { lat : 14.077018 , lng : 100.59518 },
      { lat : 14.076838 , lng : 100.595302 },
      { lat : 14.076697 , lng : 100.595427 },
      { lat : 14.07657 , lng : 100.595624 }, // ป้ายหน้าหมู่บ้านนักกีฬาโซน B
      { lat : 14.076449 , lng : 100.595879 },
      { lat : 14.076376 , lng : 100.596183 },
      { lat : 14.076303 , lng : 100.597381 }, // ป้ายหน้าโรงยิมอินเตอร์โซน 
      { lat : 14.076286 , lng : 100.597687 },
      { lat : 14.076293 , lng : 100.597858 },
      { lat : 14.076342 , lng : 100.59793 },
      { lat : 14.076309 , lng : 100.598015 },
      { lat : 14.076259 , lng : 100.598046 },
      { lat : 14.076225 , lng : 100.598053 },
      { lat : 14.076192 , lng : 100.59804 },
      { lat : 14.076156 , lng : 100.598005 },
      { lat : 14.076142 , lng : 100.597955 },
      { lat : 14.076183 , lng : 100.597877 },
      { lat : 14.07621 , lng : 100.59783 },
      { lat : 14.076211 , lng : 100.597733 },
      { lat : 14.076231 , lng : 100.597393 }, // ป้ายหน้าโรงยิมอินเตอร์โซน
      { lat : 14.076277 , lng : 100.596639 },
      { lat : 14.075919 , lng : 100.596638 }, // หอพักนักกีฬาโซน C C1
      { lat : 14.074638 , lng : 100.596697 }, // หอพักนักกีฬาโซน C C2 C3 C4
      { lat : 14.07336 , lng : 100.596729 }, //  หอพักนักกีฬาโซน C C5
      { lat : 14.073046 , lng : 100.596753 },
      { lat : 14.072814 , lng : 100.596826 },
      { lat : 14.072372 , lng : 100.596995 }, // หอพักนักกีฬาโซน C C6
      { lat : 14.071789 , lng : 100.597254 }, // หอพักนักกีฬาโซน C C7
      { lat : 14.071555 , lng : 100.597339 },
      { lat : 14.07148 , lng : 100.597351 },
      { lat : 14.071215 , lng : 100.597358 },
      { lat : 14.071239 , lng : 100.597975 }, // ป้ายหน้าอาคารหอพัก 14 ชั้น
      { lat : 14.071241 , lng : 100.598512 },
      { lat : 14.071174 , lng : 100.598608 },
      { lat : 14.070601 , lng : 100.598619 },
      { lat : 14.070492 , lng : 100.598663 },
      { lat : 14.070452 , lng : 100.598782 },
      { lat : 14.07046 , lng : 100.60013 },
      { lat : 14.070476 , lng : 100.601253 }, // ป้ายหน้ายิมเนเซียม 7
      { lat : 14.070475 , lng : 100.601651 },
      { lat : 14.069565 , lng : 100.601681 }, // จุดจอดหน้าคณะศิลปศาสตร์ , ป้ายรถเมล์หน้าอาคารเรียนรวม SC , ป้ายเล็กจุดจอดทางมา้ลายตรงข้ามอาคารเรียนรวม SC (ติดจุดเบอร์ 11)
      { lat : 14.068617 , lng : 100.601651 },
      { lat : 14.06765 , lng : 100.601646 },
      { lat : 14.067507 , lng : 100.601699 },
      { lat : 14.06749 , lng : 100.6018 },
      { lat : 14.067484 , lng : 100.603244 }, // จุดจอดหน้าคณะรัฐศาสตร์, จุดจอดหน้ายิมเนเซียม 4
      { lat : 14.06745 , lng : 100.604172 }, // จุดจอดหน้ายิมเนเซียม 6
      { lat : 14.067471 , lng : 100.604172 },
      { lat : 14.067475 , lng : 100.60587 }, // จุดจอดหน้าสถานีน้ำมันปตท.
      { lat : 14.067465 , lng : 100.606447 },
      { lat : 14.067436 , lng : 100.60748 },
      { lat : 14.067418 , lng : 100.608791 },
      { lat : 14.067415 , lng : 100.609403 }
    ];

    this.pathNgv4 = [
      { lat : 14.068534 , lng : 100.613571 },
      { lat : 14.068399 , lng : 100.613525 },
      { lat : 14.068122 , lng : 100.613535 },
      { lat : 14.06798 , lng : 100.613455 },
      { lat : 14.067971 , lng : 100.613179 },
      { lat : 14.068006 , lng : 100.613037 },
      { lat : 14.067961 , lng : 100.612959 },
      { lat : 14.066815 , lng : 100.612955 },
      { lat : 14.066851 , lng : 100.609951 },
      { lat : 14.066874 , lng : 100.609908 },
      { lat : 14.0669 , lng : 100.609901 },
      { lat : 14.067392 , lng : 100.609915 },
      { lat : 14.067405 , lng : 100.608992 }, //จุดจอดรถหน้าคณะสถาปัตยกรรม
      { lat : 14.067449 , lng : 100.606506 }, // จุดจอดหน้าสถานีน้ำมันปตท
      { lat : 14.067467 , lng : 100.604087 }, // จุดจอดหน้ายิมเนเซียม 6
      { lat : 14.067469 , lng : 100.603272 }, // จุดจอดหน้ายิมเนเซียม 4, จุดจอดหน้าคณะรัฐศาสตร์
      { lat : 14.067478 , lng : 100.601817 },
      { lat : 14.067526 , lng : 100.601698 },
      { lat : 14.067589 , lng : 100.60166 },
      { lat : 14.067782 , lng : 100.601642 },
      { lat : 14.069555 , lng : 100.601662 }, // จุดจอดหน้าคณะศิลปศาสตร์ , ป้ายรถเมล์หน้าอาคารเรียนรวม SC , ป้ายเล็กจุดจอดทางมา้ลายตรงข้ามอาคารเรียนรวม SC (ติดจุดเบอร์ 11)
      { lat : 14.070967 , lng : 100.601643 }, // จุดจอดหน้าหอสมุดป๋วย
      { lat : 14.072877 , lng : 100.601635 }, // ป้ายรถเมล์หน้าโรงอาหารกลาง
      { lat : 14.073878 , lng : 100.601616 }, // ป้ายหน้าศูนย์ธุรกิจและบริการ, จุดจอดหน้าสำนักงานอธิการบดีตรงข้ามอาคารศูนย์ธุรกิจแลับริการ
      { lat : 14.074735 , lng : 100.601615 }, // ป้ายวงเวียนหน้าศูนย์ญี่ปุ่น
      { lat : 14.074753 , lng : 100.601614 },
      { lat : 14.074772 , lng : 100.601557 },
      { lat : 14.074801 , lng : 100.601533 },
      { lat : 14.074861 , lng : 100.601528 },
      { lat : 14.074905 , lng : 100.601559 },
      { lat : 14.074922 , lng : 100.601612 },
      { lat : 14.074906 , lng : 100.601671 },
      { lat : 14.074876 , lng : 100.601695 },
      { lat : 14.074807 , lng : 100.601698 },
      { lat : 14.074759 , lng : 100.601652 },
      { lat : 14.074753 , lng : 100.601614 }
    ];

    this.pathNgv3 = [
      { lat : 14.065965 , lng : 100.599218 },
      { lat : 14.065961 , lng : 100.600555 }, //ป้ายสะพานลอยข้ามถนนเชียงราก
      { lat : 14.065953 , lng : 100.601184 },
      { lat : 14.06573 , lng : 100.602839 },
      { lat : 14.06574 , lng : 100.604183 },
      { lat : 14.065776 , lng : 100.604445  },
      { lat : 14.065839 , lng : 100.604526 },
      { lat : 14.066082 , lng : 100.604538 },
      { lat : 14.066142 , lng : 100.604594 },
      { lat : 14.066139 , lng : 100.605062 },
      { lat : 14.067457 , lng : 100.60506 },
      { lat : 14.067466 , lng : 100.60416 }, // จุจอดหน้ายิมเนเซียม 6
      { lat : 14.067467 , lng : 100.603164 }, // จุดจอดหน้ายิมเนเซียม 4
      { lat : 14.067467 , lng : 100.601839 },
      { lat : 14.067509 , lng : 100.60171 },
      { lat : 14.067627 , lng : 100.601648 },
      { lat : 14.067764 , lng : 100.60164 },
      { lat : 14.069684 , lng : 100.60166 }, // จุดจอดหน้าคณะศิลปศาสตร์, ป้ายรถเมล์หน้าอาคารเรียนรวม SC, ป้ายเล็กจุดจอดทางมา้ลายตรงข้ามอาคารเรียนรวม SC (ติดจุดเบอร์ 11)
      { lat : 14.070936 , lng : 100.601646 }, // จุดจอดหน้าหอสมุดป๋วย
      { lat : 14.072871 , lng : 100.60163 }, // ป้ายรถเมล์หน้าโรงอาหารกลาง
      { lat : 14.073826 , lng : 100.601616 }, // ป้ายหน้าศูนย์ธุรกิจและบริการ, จุดจอดหน้าสำนักงานอธิการบดีตรงข้ามอาคารศูนย์ธุรกิจแลับริการ
      { lat : 14.074692 , lng : 100.60161 }, // ป้ายวงเวียนหน้าศูนย์ญี่ปุ่น
      { lat : 14.074752 , lng : 100.601615 }, 
      { lat : 14.074769 , lng : 100.601559 },
      { lat : 14.074815 , lng : 100.60153 },
      { lat : 14.074877 , lng : 100.601532 },
      { lat : 14.074919 , lng : 100.60158 },
      { lat : 14.074916 , lng : 100.601653 },
      { lat : 14.074876 , lng : 100.601695 },
      { lat : 14.074803 , lng : 100.601695 },
      { lat : 14.074758 , lng : 100.601655 },
      { lat : 14.074752 , lng : 100.601615 }

    ];

    this.pathNgv2 = [
      { lat : 14.074716 , lng : 100.615656 }, //ป้ายหน้าโรงพยาบาล
      { lat : 14.07456 , lng : 100.615629 },
      { lat : 14.07456 , lng : 100.615629 },
      { lat : 14.074419 , lng : 100.61562 },
      { lat : 14.0743 , lng : 100.615542 },
      { lat : 14.074257 , lng : 100.615405 },
      { lat : 14.074287 , lng : 100.615192 },
      { lat : 14.074359 , lng : 100.615145 },
      { lat : 14.074668 , lng : 100.615145 },
      { lat : 14.074716 , lng : 100.615254 },
      { lat : 14.074716 , lng : 100.616183 },
      { lat : 14.072181 , lng : 100.616173 },
      { lat : 14.072153 , lng : 100.613233 }, //ป้ายหน้าคณะแพทย์ศาสตร์
      { lat : 14.07214 , lng : 100.611752 }, //ป้ายหน้าอาคารปิยชาติ
      { lat : 14.072112 , lng : 100.608129 }, //ป้ายหน้าอาคารบรรยายรวม 4, ป้ายหน้าคณะศิลปกรรมศาสตร์ 
      { lat : 14.07209 , lng : 100.605166 }, //ป้ายหน้าสถาบันประมวลข้อมูลเพื่อการศึกษาและการพัฒนา, ป้ายตรงข้ามสถาบันประมวลข้อมูลเพื่อการศึกษาและการพัฒนา
      { lat : 14.072075 , lng : 100.603454 }, //ป้ายหน้าห้องสมุดคณะวิทย์, ป้ายตรงข้ามห้องสมุดคณะวิทย์
      { lat : 14.07206 , lng : 100.601938 },
      { lat : 14.072058 , lng : 100.601649 },
      { lat : 14.072882 , lng : 100.60163 }, // ป้ายรถเมล์หน้าโรงอาหารกลาง
      { lat : 14.073924 , lng : 100.601616 }, // ป้ายหน้าศูนย์ธุรกิจและบริการ, จุดจอดหน้าสำนักงานอธิการบดีตรงข้ามอาคารศูนย์ธุรกิจแลับริการ
      { lat : 14.074682 , lng : 100.601616 }, // ป้ายวงเวียนหน้าศูนย์ญี่ปุ่น
      { lat : 14.074751 , lng : 100.601613 },
      { lat : 14.074793 , lng : 100.601533 },
      { lat : 14.07488 , lng : 100.601542 },
      { lat : 14.074923 , lng : 100.601612  },
      { lat : 14.075439 , lng : 100.601608 }, //ป้ายรถเมล์หน้า สวทช , จุดจอดท่รรุกตู้
      { lat : 14.075954 , lng : 100.601613 },
      { lat : 14.076027 , lng : 100.60066 }, // ป้ายหน้าตึกกิจกรรมนักศึกษา
      { lat : 14.076043 , lng : 100.600197 }, // ป้ายสามแยกเข้าลานจอดรถหมู่บ้านนักกีฬาโซน b
      { lat : 14.076058 , lng : 100.599862 }, // ป้ายหน้าโรงเรียนประถมศึกษาธรรมศาสตร์
      { lat : 14.076142 , lng : 100.59866 }, // ป้ายตรงข้ามโรงเรียนอนุบาลธรรมศาสตร์
      { lat : 14.076183 , lng : 100.598045 }, 
      { lat : 14.076138 , lng : 100.597943 },
      { lat : 14.076201 , lng : 100.597849 },
      { lat : 14.076287 , lng : 100.5963 },
      { lat : 14.076358 , lng : 100.595855 }, //ป้ายเล็จุดจอดหน้าโรงอาหารอินเตอร์โซน, ป้ายหน้าหมู่บ้านนักกี่ฬาโซน B
      { lat : 14.07645 , lng : 100.595633 },
      { lat : 14.076646 , lng : 100.595334 },
      { lat : 14.077089 , lng : 100.595029 },
      { lat : 14.077315 , lng : 100.594943 },
      { lat : 14.077383 , lng : 100.594734 },
      { lat : 14.077586 , lng : 100.594621 },
      { lat : 14.077769 , lng : 100.594638 },
      { lat : 14.07791 , lng : 100.594739 },
      { lat : 14.077963 , lng : 100.594904 }, // ป้ายวงเวียนหมู่บ้านนักกีฬา
      { lat : 14.077867 , lng : 100.595098 },
      { lat : 14.077716 , lng : 100.595192 },
      { lat : 14.077518 , lng : 100.595191 },
      { lat : 14.077347 , lng : 100.595058 },
      { lat : 14.077315 , lng : 100.594943 }
    ];

    this.drawPathNgv1A = new google.maps.Polyline({
      path: this.pathNgv1A,
      geodesic: true,
      strokeColor: '#6200EA',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    this.drawPathNgv1B = new google.maps.Polyline({
      path: this.pathNgv1B,
      geodesic: true,
      strokeColor: '#0091EA',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    this.drawPathNgv2 = new google.maps.Polyline({
      path: this.pathNgv2,
      geodesic: true,
      strokeColor: '#00C853',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    this.drawPathNgv3 = new google.maps.Polyline({
      path: this.pathNgv3,
      geodesic: true,
      strokeColor: '#FF6D00',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    this.drawPathNgv4 = new google.maps.Polyline({
      path: this.pathNgv4,
      geodesic: true,
      strokeColor: '#263238',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });


  }

  getPlaceFromSearch(ev:any) {

    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(val);

    this.autocompletePlaces = [];
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.autocompletePlaces = this.places.filter((item) => {
        if(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1){
          return item;
        }
      })
    }
    
    //console.log(this.autocompletePlaces);
  }


  clear(){
    if(this.marker){
      this.marker.setMap(null);
      this.marker = null;  
    }
    this.drawPathNgv1A.setMap(null);
    this.drawPathNgv1B.setMap(null);
    this.drawPathNgv2.setMap(null);
    this.drawPathNgv3.setMap(null);
    this.drawPathNgv4.setMap(null);

    this.color1A = '#6200EA';
    this.background1A = 'white';
    this.borderColor1A = '#6200EA';

    this.color1B = '#0091EA';
    this.background1B = 'white';
    this.borderColor1B = '#0091EA';


    this.color2 = '#00C853';
    this.background2 = 'white';
    this.borderColor2 = '#00C853';

    this.color3 = '#FF6D00';
    this.background3 = 'white';
    this.borderColor3 = '#FF6D00';

    this.color4 = '#263238';
    this.background4 = 'white';
    this.borderColor4 = '#263238';  
  }

  clearAll(){
    if(this.marker){
      this.marker.setMap(null);
      this.marker = null;  
    }
    this.drawPathNgv1A.setMap(null);
    this.drawPathNgv1B.setMap(null);
    this.drawPathNgv2.setMap(null);
    this.drawPathNgv3.setMap(null);
    this.drawPathNgv4.setMap(null);

    this.color1A = '#6200EA';
    this.background1A = 'white';
    this.borderColor1A = '#6200EA';

    this.color1B = '#0091EA';
    this.background1B = 'white';
    this.borderColor1B = '#0091EA';


    this.color2 = '#00C853';
    this.background2 = 'white';
    this.borderColor2 = '#00C853';

    this.color3 = '#FF6D00';
    this.background3 = 'white';
    this.borderColor3 = '#FF6D00';

    this.color4 = '#263238';
    this.background4 = 'white';
    this.borderColor4 = '#263238';  

    this.autocompletePlace = {
      name: '',
      position: null
    };
    
    this.autocompletePlaces = [];
  }

  choosePlace(item:any){

    this.clear();  

    this.autocompletePlace = item;
    this.autocompletePlaces = [];

    console.log(item);
    let locationMarker = new google.maps.LatLng( item.positionPlace.lat, item.positionPlace.lng );
    this.marker = new google.maps.Marker({position: locationMarker, title: item.name});
    this.marker.setMap(this.map);

    let i = 0;
    for( i  ; i < item.ngv.length ; i++){

      if(item.ngv[i] === '1A'){

        this.drawPathNgv1A.setMap(this.map);

        this.color1A = 'white';
        this.background1A = '#6200EA';
        this.borderColor1A = '#6200EA';  

      }else if(item.ngv[i] === '1B'){

        this.drawPathNgv1B.setMap(this.map);

        this.color1B = 'white';
        this.background1B = '#0091EA';
        this.borderColor1B = '#0091EA';

      }else if(item.ngv[i] === '2'){

        this.drawPathNgv2.setMap(this.map);

        this.color2 = 'white';
        this.background2 = '#00C853';
        this.borderColor2 = '#00C853';

      }else if(item.ngv[i] === '3'){

        this.drawPathNgv3.setMap(this.map);

        this.color3 = 'white';
        this.background3 = '#FF6D00';
        this.borderColor3 = '#FF6D00';

      }else{

        this.drawPathNgv4.setMap(this.map);

        this.color4 = 'white';
        this.background4 = '#263238';
        this.borderColor4 = '#263238';

      }
    }

  }

  ngvButtonEvent(val:any){

    if(val === '1A'){

      if(this.drawPathNgv1A.getMap()){
        this.drawPathNgv1A.setMap(null);
        this.color1A = '#6200EA';
        this.background1A = 'white';
        this.borderColor1A = '#6200EA';
      }else{

        this.drawPathNgv1A.setMap(this.map);
        this.color1A = 'white';
        this.background1A = '#6200EA';
        this.borderColor1A = '#6200EA';
      }

    }else if(val === '1B'){

      if(this.drawPathNgv1B.getMap()){
        this.drawPathNgv1B.setMap(null);
        this.color1B = '#0091EA';
        this.background1B = 'white';
        this.borderColor1B = '#0091EA';
      }else{
        this.drawPathNgv1B.setMap(this.map);
        this.color1B = 'white';
        this.background1B = '#0091EA';
        this.borderColor1B = '#0091EA';
      }

    }else if(val === '2'){

      if(this.drawPathNgv2.getMap()){
        this.drawPathNgv2.setMap(null);
        this.color2 = '#00C853';
        this.background2 = 'white';
        this.borderColor2 = '#00C853';
      }else{
        this.drawPathNgv2.setMap(this.map);
        this.color2 = 'white';
        this.background2 = '#00C853';
        this.borderColor2 = '#00C853';
      }

    }else if(val === '3'){

      if(this.drawPathNgv3.getMap()){
        this.drawPathNgv3.setMap(null);
        this.color3 = '#FF6D00';
        this.background3 = 'white';
        this.borderColor3 = '#FF6D00'; 
      }else{
        this.drawPathNgv3.setMap(this.map);
        this.color3 = 'white';
        this.background3 = '#FF6D00';
        this.borderColor3 = '#FF6D00'; 
      }

    }else{

      if(this.drawPathNgv4.getMap()){
        this.drawPathNgv4.setMap(null);
        this.color4 = '#263238';
        this.background4 = 'white';
        this.borderColor4 = '#263238';
      }else{
        this.drawPathNgv4.setMap(this.map);
        this.color4 = 'white';
        this.background4 = '#263238';
        this.borderColor4 = '#263238';
      }

    }

  }



}
