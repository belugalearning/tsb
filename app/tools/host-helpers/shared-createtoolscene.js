
ToolLayer.create = function () {
    var sg = new ToolLayer();
    if (sg && sg.init(cc.c4b(255, 255, 255, 255))) {
        return sg;
    }
    return null;
};
 
ToolLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = ToolLayer.create();
    scene.addChild(layer);

    scene.layer=layer;

    // scene.setMouseEnabled(true);
    // scene.onMouseDown=function(event){cc.log("mouse down");};

    scene.ql=new QLayer();
    scene.ql.init();
    layer.addChild(scene.ql, 99);

    scene.update=function(dt){
    	this.layer.update(dt)
    	this.ql.update(dt)
    };
    scene.scheduleUpdate();


    return scene;
};
