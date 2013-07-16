window.onload = function() {

var v = undefined;

var images = [
'IM-0001-0001.dcm', 'IM-0001-0002.dcm', 'IM-0001-0003.dcm', 'IM-0001-0004.dcm',
'IM-0001-0005.dcm', 'IM-0001-0006.dcm', 'IM-0001-0007.dcm', 'IM-0001-0008.dcm',
'IM-0001-0009.dcm', 'IM-0001-0010.dcm', 'IM-0001-0011.dcm', 'IM-0001-0012.dcm',
'IM-0001-0013.dcm', 'IM-0001-0014.dcm', 'IM-0001-0015.dcm', 'IM-0001-0016.dcm',
'IM-0001-0017.dcm', 'IM-0001-0018.dcm', 'IM-0001-0019.dcm', 'IM-0001-0020.dcm',
'IM-0001-0021.dcm', 'IM-0001-0022.dcm'];
  
  // the DICOM files
  //
var _dicom = [];

	for (var i = 0 ; i < images.length ; i++) {
		_dicom.push(images[i]);
	}

  // create a new test_renderer
  var r = new X.renderer3D();
  r.init();
  
  // we create the X.volume container and attach all DICOM files
  v = new X.volume();
  // map the data url to each of the slices
  v.file = _dicom.sort().map(function(v) {
 	var res = 'file:///home/enet4/IEETA/3dmed/sT2-TSE-T - 301/' + v;
// 	var res = 'file://./img/' + v;
    
	// add the 'fake' .DCM extension (not needed here)
    //res += '&.DCM';
    
    return res;
  });
  
  // add the volume
  r.add(v);
  
  // setup the camera
  r.camera.position = [-10, -50, 540];
  r.camera.up = [0, -1, 0];

  volume = v;
  
  // .. and render it
  r.render();
  
  r.onShowtime = function() {

    console.log('volume:');
    console.log(v);

    //
    // The GUI panel
    //
    // (we need to create this during onShowtime(..) since we do not know the
    // volume dimensions before the loading was completed)
        
    var gui = new dat.GUI();
    
    // the following configures the gui for interacting with the X.volume
    var volumegui = gui.addFolder('Volume');
    // now we can configure controllers which..
    // .. switch between slicing and volume rendering
    var vrController = volumegui.add(volume, 'volumeRendering');
    // the min and max color which define the linear gradient mapping
    var minColorController = volumegui.addColor(volume, 'minColor');
    var maxColorController = volumegui.addColor(volume, 'maxColor');
    // .. configure the volume rendering opacity
    var opacityController = volumegui.add(volume, 'opacity', 0, 1).listen();
    // .. and the threshold in the min..max range
    var lowerThresholdController = volumegui.add(volume, 'lowerThreshold',
        volume.min, volume.max);
    var upperThresholdController = volumegui.add(volume, 'upperThreshold',
        volume.min, volume.max);
    var lowerWindowController = volumegui.add(volume, 'windowLow', volume.min,
        volume.max);
    var upperWindowController = volumegui.add(volume, 'windowHigh', volume.min,
        volume.max);
    // the indexX,Y,Z are the currently displayed slice indices in the range
    // 0..dimensions-1
    var sliceXController = volumegui.add(volume, 'indexX', 0,
        volume.dimensions[2] - 1);
    var sliceYController = volumegui.add(volume, 'indexY', 0,
        volume.dimensions[1] - 1);
    var sliceZController = volumegui.add(volume, 'indexZ', 0,
        volume.dimensions[0] - 1);
    volumegui.open();

    // activate volume rendering
//	v.volumeRendering = true;
//	v.lowerThreshold = 50;
//	v.windowLower = 115;
//	v.windowHigh = 360;
//	v.minColor = [0, 0.06666666666666667, 1];
//	v.maxColor = [0.5843137254901961, 1, 0];
	v.minColor = [0.25, 0.25, 0.25];
	v.maxColor = [0.85, 0.85, 0.85];
//	v.opacity = 0.225;
    
  };
  
};

