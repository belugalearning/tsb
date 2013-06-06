
var ToolLayer = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    titleLabel:null,
    circle:null,
    sprite:null,
    clc:null,
    lastcount:null,
    lastb:null,
    objlayer:null,
    allpsprites:new Array(),
    touchSprite:null,
    touching:false,
    drawnode:null,
    commitBtn:null,
    allobjects:new Array(),
    showDebug:true,

    init:function () {

        this._super();
        // this.init();

        // if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);
        // else if( 'mouse' in sys.capabilities )
            // this.setMouseEnabled(true);

        var size = cc.Director.getInstance().getWinSize();

        clc=cc.LayerColor.create(cc.c4b(70,70, 70,255));
        this.addChild(clc,-2);

        // this.titleLabel = cc.LabelTTF.create("Empty Tool", "Helvetica", 38);
        // this.titleLabel.setPosition(cc.p(size.width / 2, size.height - 40));
        // this.addChild(this.titleLabel, 5);
        
        this.objlayer=cc.Layer.create();
        this.addChild(this.objlayer, 1);

        this.drawnode=cc.DrawNode.create();
        this.addChild(this.drawnode, 0);

        this.debugnode=cc.DrawNode.create();
        this.addChild(this.debugnode, 99);
        this.debugnode.setVisible(this.showDebug);

        this.space = new cp.Space();

        this.backgroundSprite=cc.Sprite.create(s_imagePath+"background.png");
        this.backgroundSprite.setPosition(size.width/2, size.height/2);
        this.addChild(this.backgroundSprite, -1);

        this.commitBtn=cc.Sprite.create(s_imagePath+"commit.png");
        this.commitBtn.setPosition(cc.p(size.width-60, size.height-35));
        this.addChild(this.commitBtn);

        this.titleLabel = cc.LabelTTF.create("...", "Helvetica", 38);
        this.titleLabel.setPosition(cc.p(size.width / 2, size.height - 50));
        this.addChild(this.titleLabel, 5);

        var space = this.space ;
        var staticBody = space.staticBody;

        // Walls
        var walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(size.width,0), 0 ),               // bottom
                new cp.SegmentShape( staticBody, cp.v(0,size.height), cp.v(size.width,size.height), 0),    // top
                new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,size.height), 0),             // left
                new cp.SegmentShape( staticBody, cp.v(size.width,0), cp.v(size.width,size.height), 0)  // right
                ];
        for( var i=0; i < walls.length; i++ ) {
            var shape = walls[i];
            shape.setElasticity(1);
            shape.setFriction(1);
            space.addStaticShape( shape );
        }

        space.gravity = cp.v(0, 0);
        space.damping=0.05;

        this.setupTool();

        return this;
    },

    setupTool:function(dt){

        //clean up old objects
        for(var i=0; i<this.allpsprites.length; i++)
        {
            var ps=this.allpsprites[i];
            this.space.removeShape(ps._body.shapeList[0]);
            this.space.removeBody(ps._body);

            this.objlayer.removeChild(ps, false);
        }

        //only while we're removing everything from the array, else we could just pop the one we don't
        this.allpsprites=new Array();
        this.allobjects=new Array();

        //iterate over tool state data

        if(typeof contentService != 'undefined')
        {
            var question = contentService.nextQuestion()
            var doc = new XmlDocument(question.initialState)

            //update question text
            this.titleLabel.setString(question.text)            

        }
        else {
            // var doc=new XmlDocument("<set><set><ci>item0</ci><ci>item1</ci><ci>item2</ci><ci>item3</ci><ci>item4</ci><ci>item5</ci></set></set>");
            var doc=new XmlDocument("<set><set><ci>item4</ci><ci>item2</ci><ci>item0</ci></set><set><ci>item1</ci><ci>item3</ci><ci>item5</ci></set></set>");
            // var doc=new XmlDocument("<set><set><ci>item2</ci><ci>item0</ci></set><set><ci>item3</ci><ci>item5</ci></set><set><ci>item4</ci><ci>item1</ci></set></set>");
        }

        console.log(doc);
        console.log(doc.children);

        for(var l=0; l<doc.children.length; l++) {
            var child=doc.children[l];
            var thisset=new Array();
            this.allobjects.push(thisset);

        // doc.eachChild(function(child, index, array) {
            console.log("building set")
            asprites=new Array();
         
            for(var j=0; j<child.children.length; j++) {
            // child.eachChild(function(child, index, array) {
                var jchild=child.children[j];
             
                console.log("building object");

                var x=Math.random()*924 + 50;
                var y=Math.random()*569 + 50;

                var s=this.createPhysicsSprite(cc.p(x,y));


                //add the text value of the original item
                s.sourceTag=jchild.val;

                if(this.showDebug) {
                    var lbl=cc.LabelTTF.create(s.sourceTag, "Helvetica", 10);
                    s.addChild(lbl);
                }

                //reference to set
                s.parentSet=thisset;

                this.objlayer.addChild(s, 1);   

                // cc.log(" allps is " + this.allpsprites.length);
                this.allpsprites.push(s);    
                asprites.push(s);     
                thisset.push(s);
            }

            //attach all the bodies to eachother
            for(var i=0; i<asprites.length; i++)
            {
                var ps1=asprites[i];
                
                // for(var j=i; j<2; j++)
                // {
                var k=(i+1)%(asprites.length);

                cc.log(i + " .... " + k);
                var ps2=asprites[k];

                if(ps1!=ps2 && ps1!=null && ps2!=null)
                {
                    this.bondObjects(ps1, ps2);
                }
    
            }
            
        }


        // var newc=emapData.a * emapData.b;
        // var oldc=this.lastcount * this.lastb;

        // cc.log("newc: " + newc + "  oldc: " + oldc);
        
        // this.lastcount=emapData.a;
        // this.lastb=emapData.b;
    },

    bondObjects:function(ps1, ps2)
    {
        var slide=new cp.SlideJoint(ps1.refBody, ps2.refBody, cp.vzero, cp.vzero, 100,200);
        this.space.addConstraint(slide);

        var spring=new cp.DampedSpring(ps1.refBody, ps2.refBody, cp.vzero, cp.vzero, 0, 3, 0.05);
        this.space.addConstraint(spring);

        ps1.slide=slide;
        ps1.spring=spring;
        ps1.otherps=ps2;
        ps2.linkingps=ps1;
    },

    commitAnswer:function() {
      var ans =
        '<set>' +
        this.allobjects.map(function(grp) { return (
          '<set>' + 
          grp.map(function(item) { return '<ci>' + item.sourceTag + '</ci>' }).join('') +
          '</set>')
        }).join('') +
        '</set>'

      console.log('ans:', ans)
      this.setupTool()
    },

    update:function (dt) {

        this.space.step( dt );

        // if(this.lastcount!=emapData.a || this.lastb!=emapData.b)
        // {
        //     this.setupTool();
        // }


        //monitor held object connections
        if(this.touchSprite!=null)
        {
            if(this.touchSprite.otherps!=null) this.testBrokenBond(this.touchSprite);
            if(this.touchSprite.linkingps!=null) this.testBrokenBond(this.touchSprite.linkingps);
        }

        if(this.touchSprite!=null && this.touchSprite.otherps==null && this.touchSprite.linkingps==null)
        {
            this.testNewBond(this.touchSprite);
        }

        //draw stuff
        this.drawnode.clear();
        this.debugnode.clear();

        for(var i=0; i<this.allpsprites.length; i++)
        {
            var ps1=this.allpsprites[i];

            if(ps1.otherps!=null)
                this.drawnode.drawSegment(ps1.getPosition(), ps1.otherps.getPosition(), 3, cc.c4b(255, 255, 255, 1));

            if(this.showDebug)
            {
                //draw position dot
                this.debugnode.drawDot(ps1.getPosition(), 4, cc.c4b(255, 0, 0, 255));

                this.debugnode.drawDot(cc.p(ps1.getBoundingBox().x, ps1.getBoundingBox().y), 3, cc.c4b(255, 255, 0, 150));
                this.debugnode.drawDot(cc.p(ps1.getBoundingBox().x + ps1.getBoundingBox().width, ps1.getBoundingBox().y + ps1.getBoundingBox().height), 3, cc.c4b(255, 255, 0, 150));
            }
               
        }
    },

    testBrokenBond:function(o1){
        var o2=o1.otherps;
        var d=Math.abs(cc.pDistance(o1.getPosition(), o2.getPosition()));
        // console.log(d);

        if(d>220)
        {
            console.log("breaking bond on " + o1.sourceTag + " to " + o1.otherps.sourceTag);

            var origfwd=o1.otherps;

            this.breakForwardBondOn(o1);

            this.testAndCreateSetFor(origfwd);
            this.testAndCreateSetFor(o1);
        }
    },

    testAndCreateSetFor:function(obj){
        console.log("testing set removal from " + obj.sourceTag + " with set length " + obj.parentSet.length);
        if(obj.otherps==null && obj.linkingps==null && obj.parentSet.length!=1)
        {
            //break this object from set
            obj.parentSet.pop(obj);
            obj.parentSet=null;

            //create a new set for this object
            newset=new Array();
            newset.push(obj);

            obj.parentSet=newset;

            // if(obj.linkingps!=null) newset.push(obj.otherps)
            // else newset.push(obj)

            this.allobjects.push(newset);
        }
    },

    breakForwardBondOn:function(o1)
    {
        this.space.removeConstraint(o1.spring);
        this.space.removeConstraint(o1.slide);
        o1.otherps.linkingps=null;
        o1.otherps=null;
    },

    testNewBond:function(o1){
        //iterate over all other sprites and get closest

        var mind=1024;
        var besto=null;

        for(var i=0; i<this.allpsprites.length; i++)
        {
            var othero=this.allpsprites[i];
            if(othero!==o1)
            {
                var d=cc.pDistance(o1.getPosition(), othero.getPosition());
                if(besto==null || d<mind)
                {
                    mind=d;
                    besto=othero;
                }
            }
        }

        // console.log(besto + " (at distance " + mind + ")");

        //if distance < threshold, keep it as bonding object, tint that object
        if(mind<100 && this.bondingObject!=besto)
        {
            this.unsetBondingObject();

            this.bondingObject=besto;
            besto.setColor(cc.c4b(200,255,200,255));
        }
        // else if(this.bondingObject!=null && best!=null)
        // {
        //     //reset any highlighting and set object
        //     this.unsetBondingObject();
        // }
        // //else the object is already set to this object

    },

    unsetBondingObject:function() {
        if(this.bondingObject!=null)
        {
            //reset ting on bonding object
            this.bondingObject.setColor(cc.c4b(255,255,255,255));

            this.bondingObject=null;
        }
    },

    onEnter:function () {
        this._super();

        // this.setTouchEnabled(true);
        // this.setMouseEnabled(true);

        // cc.log(sys.capabilities);

        // if( 'touches' in sys.capabilities )
        //     this.setTouchEnabled(true);
        // else if( 'mouse' in sys.capabilities )
        //     this.setMouseEnabled(true);

        // sys.dumpRoot();
        // sys.garbageCollect();
    },

    onCleanup: function() {
        // Not compulsory, but recommended: cleanup the scene
        this.unscheduleUpdate();
    },

    onExit:function () {
        this._super();
    },

    onTouchesBegan: function(touches, event) {
        // cc.log("touching at " + touches[0].getLocation().x + ", " + touches[0].getLocation().y);

        if (cc.rectContainsPoint(this.commitBtn.getBoundingBox(), touches[0].getLocation()))
        {
            console.log("commit pressed");
            this.commitAnswer();
        }
        else if(touches[0].getLocation().x>974 && touches[0].getLocation().y<50)
        {
            this.showDebug=!this.showDebug;
            this.debugnode.setVisible(this.showDebug);
        }

        else
        {
            this.touching=true;
            this.touchSprite=null;

            // console.log("touch at " + touches[0].getLocation().x + ", " + touches[0].getLocation().y);

            for(var i=0; i<this.allpsprites.length; i++)
            {
                var ps=this.allpsprites[i];
                // console.log(ps.sourceTag + " at " + ps.getBoundingBox().x + ", " + ps.getBoundingBox().y  + ", " + ps.getBoundingBox().width  + ", " + ps.getBoundingBox().height );

                if(cc.pDistance(ps.getPosition(), touches[0].getLocation()) < 35) {

                // if(cc.rectContainsPoint(ps.getBoundingBox(), touches[0].getLocation()))
                // {
                    this.touchSprite=ps;
                    break;
                }
            }

            if(this.touchSprite!=null)
            {
                cc.log("touched " + ps);
            }
        }
    },

    onTouchesEnded: function( touches, event ) {

        //if there's a bonding object, bond to it
        if(this.bondingObject!=null)
        {
            console.log("going to bond to " + this.bondingObject.sourceTag + " with otherps " + this.bondingObject.otherps + " with linkingps " + this.bondingObject.linkingps);


            if(this.bondingObject.otherps==null)
                this.bondObjects(this.bondingObject, this.touchSprite);

            else if(this.bondingObject.linkingps==null)
                this.bondObjects(this.touchSprite, this.bondingObject);

            else {
                //break the existing previous bond (linking) and insert this one
                var prevlinking=this.bondingObject.linkingps;
                this.breakForwardBondOn(prevlinking);

                this.bondObjects(prevlinking, this.touchSprite);
                this.bondObjects(this.touchSprite, this.bondingObject);
            }

            //add to set of bonding object
            var oldset=this.touchSprite.parentSet;
            this.bondingObject.parentSet.push(this.touchSprite);

            //remove from old set
            oldset.pop(this.touchSprite);

            //destroy old set if empty
            if(oldset.length==0) this.allobjects.pop(oldset);

            //unset/unhighlight the bonding object
            this.unsetBondingObject();
        }

        this.touching=false;
        this.touchSprite=null;
        this.bondingObject=null;

        console.log("set count: " + this.allobjects.length);

    },

    onTouchesMoved: function(touches, event) {
        if(this.touchSprite!=null)
        {
            this.touchSprite.setPosition(touches[0].getLocation());
        }
    },


    createPhysicsSprite: function( pos ) {
        var body = new cp.Body(1, cp.momentForBox(1, 73, 73) );
        body.setPos( pos );
        this.space.addBody( body );
        var shape = new cp.BoxShape( body, 73, 73);
        shape.setElasticity( 0.5 );
        shape.setFriction( 0.5 );
        this.space.addShape( shape );

        // var sprite=cc.Sprite.create(s_imagePath+"object.png");

        var sprite = cc.PhysicsSprite.create(s_imagePath + "object.png");
        sprite.setBody( body );

        sprite.refBody=body;
        return sprite;
    },

    // addSprite: function( pos ) {
    //     var sprite =  this.createPhysicsSprite( pos );
    //     this.addChild( sprite );
    // },
});




