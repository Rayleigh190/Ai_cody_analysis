
    // <!-- jcrop를 사용하기 위한 js -->

    let jcropApi = null;

    // @breif 이미지 크롭 영역지정 UI 나타내기

    function imgCropDesignate() {
        console.log("확인3")

        let editWidth = jQuery("#editImg").width();
        let editHeight = jQuery("#editImg").height();

        // @breif jcrop 실행시 크롭영역을 미리 세팅

        let x1 = window.screen.width / 2 - editWidth;
        let y1 = window.screen.height / 2 - editHeight;
        let x2 = editWidth / 4;
        let y2 = editHeight / 2;

        // @breif jcrop 실행
        console.log("확인4")
        jQuery("#editImg").Jcrop({

                bgFade : true
            , bgOpacity : .2
            , setSelect : [ x1, y1, x2, y2 ]
            , onSelect : updateCoords
        }, function() { console.log("ok")
            jcropApi = this;
        });
        console.log("확인5")
        jQuery("#editBtn").css("display", "none");
        jQuery("#cutBtn").css("display", "inline");
    }

    /* // @breif 지정된 크롭 한 영역( 좌표, 넓이, 높이 )의 값을 보관하는 함수 */

    function updateCoords(crap) {

    jQuery("#xAxis").val(crap.x);
    jQuery("#yAxis").val(crap.y);
    jQuery("#wLength").val(crap.w);
    jQuery("#hLength").val(crap.h);
    }

    {/* // @breif 크롭한 영역 잘라내고 추출하기 */}

    function imgCropApply() {

    if(parseInt(jQuery("#wLength").val()) == "NaN") {

        alert("이미지를 크롭한 이후\n자르기 버튼을 클릭하세요.");
        return false;

    } else {

        let editImage = new Image();
        editImage.src = jQuery("#editImg").attr("src");

        editImage.onload = function() {

            // @breif 캔버스 위에 이미지 그리기

            let canvas = document.querySelector("canvas");
            let canvasContext = canvas.getContext("2d");

            // @breif 캔버스 크기를 이미지 크기와 동일하게 지정

            canvas.width = jQuery("#wLength").val();
            canvas.height = jQuery("#hLength").val();

            canvasContext.drawImage(

                    this

                , jQuery("#xAxis").val()        // 자르기를 시작할 x좌표

                , jQuery("#yAxis").val()        // 자르기를 시작할 y좌표

                , jQuery("#wLength").val()    // 잘라낸 이미지의 넓이

                , jQuery("#hLength").val()    // 잘라낸 이미지의 높이

                , 0                                         // 캔버스에 이미지를 배치할 x좌표

                , 0                                         // 캔버스에 이미지를 배치할 y좌표

                , jQuery("#wLength").val()    // 사용할 이미지의 넓이(이미지 스트레칭 또는 축소)

                , jQuery("#hLength").val()    // 사용할 이미지의 높이(이미지 스트레칭 또는 축소)

            );

            // @breif 편집한 캔버스의 이미지를 화면에 출력한다.

            let dataURI = canvas.toDataURL("image/jpeg");

            jQuery("#editImg").attr("src", dataURI);

            

            // @breif 이미지의 크기는 자른 이미지와 동일하게 지정

            jQuery("#editImg").css("width", jQuery("#wLength").val());

            jQuery("#editImg").css("height", jQuery("#hLength").val());

        };

        jQuery("#cutBtn").css("display", "none");

        // @details JCROP을 종료한다.

        jcropApi.destroy();

    jcropApi = null;
    $('#loading').show();

    }

    init().then(()=>{
        console.log("hello");
        predict();
        $('#loading').hide();
        });

    }

    /* // @breif 캔버스 이미지 생성 */

    function canvasDrawImage(callback) {


    console.log("확인2")
    let prepImage = new Image();

    prepImage.src = jQuery("#editImg").attr("src");



    prepImage.onload = function() {



        // @details 캔버스 위에 이미지 그리기

        // jQuery("canvas") 와같은 명령은 사용할 수 없다.

        let canvas = document.querySelector("canvas");

        let canvasContext = canvas.getContext("2d");



        canvas.width = jQuery("#editImg").width();

        canvas.height = jQuery("#editImg").height();

        canvasContext.drawImage(this, 0, 0, jQuery("#editImg").width(), jQuery("#editImg").height());



        // @details 캔버스의 이미지

        let dataURI = canvas.toDataURL("image/jpeg");

        jQuery("#editImg").attr("src", dataURI);

        

        callback();

    };

    }
