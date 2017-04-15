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

  pathNgv2: any;
  pathNgv3: any;
  pathNgv4: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {

    this.places = [
      { 
        name : "อาคารโดมบริหาร" , 
        position : { lat : 14.073586 , lng : 100.602949 },  
        ngv : [ "1a" , "1b" , "2" , "3" , "4" ],
        label : "ป้ายตรงข้ามโรงอาหารกรีน"
      },
      { 
        name : "วงเวียนสถาบันเอชียตะวันออก" , 
        position : { lat : 14.074836 , lng : 100.601619 },
        ngv : [ "1a" , "1b" , "2" , "3" , "4" ],
        label : "ป้ายสถาบันเอเชียตะวันออก"
      },
      { 
        name : "สถาบันเอเชียตะวันออก" , 
        position : { lat : 14.074828 , lng : 100.600345 }, 
        ngv : [ "1a" , "1b" , "2" , "3" , "4" ],
        lable : "ป้ายสถาบันเอเชียตะวันออก"
      },
      { 
        name : "โรงอาหารกรีน" , 
        position: { lat : 14.073313 , lng : 100.601182 },
        ngv : [ "1a" , "1b" , "2" , "3" , "4" ],
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
/*
      { lat : 14.074716 , lng : 100.616183 },
      { lat : 14.072171 , lng : 100.616173 }
      { lat :  , lng :  }
*/
  	this.map =  new google.maps.Map(this.mapElement.nativeElement, mapOption);

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

    ]

    let drawPathNgv3 = new google.maps.Polyline({
      path: this.pathNgv3,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    //drawPathNgv3.setMap(this.map);

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

        let drawPathNgv2 = new google.maps.Polyline({
          path: this.pathNgv2,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        //drawPathNgv2.setMap(this.map);

  }

  getPlaceFromSearch(ev: any) {

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
    
    console.log(this.autocompletePlaces);
  }

  choosePlace(item:any){

    this.autocompletePlace = item;
    this.autocompletePlaces = [];

    let locationMarker = new google.maps.LatLng( item.position.lat, item.position.lng );
    this.marker = new google.maps.Marker({position: locationMarker, title: item.name});
    this.marker.setMap(this.map);

    console.log(item);

  }




}
