let net
var sound = new Howl({src: ['./shoot.wav']});
  

function setup() {
    createCanvas(700, 500);
    capture = createCapture(VIDEO);
    capture.hide();
    frameRate( 3 )
    net = loadNet()
}
  
function draw() {
    background(220);
    image( capture, 0,0)
    stroke(255,0,0)
    strokeWeight(5)

    if( net ){
        loadAndPredict()
    }
}

async function loadAndPredict() {
    try {
        const segmentation = await net.segmentPerson( document.querySelector('video') );

        if( segmentation.allPoses[0].keypoints  ){
            //if( segmentation.allPoses[0]. ) 
            //console.log( segmentation.allPoses[0].score )
            segmentation.allPoses[0].keypoints.forEach( keypoint =>{
                if( keypoint.score > 0.3 ){
                    point( keypoint.position.x, keypoint.position.y)
                    //text( keypoint.part,  keypoint.position.x, keypoint.position.y)
                }
            })
        }
    } catch (error) {
        //console.log( error );
    }
    
}

async function loadNet() {
    net = await bodyPix.load();
    return net
}
