
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

    init:function () {

        this._super();
        // this.init();

        // if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);
        // else if( 'mouse' in sys.capabilities )
            // this.setMouseEnabled(true);

        var size = cc.Director.getInstance().getWinSize();

        clc=cc.LayerColor.create(cc.c4b(70,70, 70,255));
        this.addChild(clc,0);

        // this.titleLabel = cc.LabelTTF.create("Empty Tool", "Helvetica", 38);
        // this.titleLabel.setPosition(cc.p(size.width / 2, size.height - 40));
        // this.addChild(this.titleLabel, 5);
        
        this.objlayer=cc.Layer.create();
        this.addChild(this.objlayer, 1);

        this.drawnode=cc.DrawNode.create();
        this.addChild(this.drawnode, 0);

        this.space = new cp.Space();

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

        // var doc=new XmlDocument("<set><set><ci>item0</ci><ci>item1</ci><ci>item2</ci><ci>item3</ci><ci>item4</ci><ci>item5</ci></set></set>");
        // var doc=new XmlDocument("<set><set><ci>item4</ci><ci>item2</ci><ci>item0</ci></set><set><ci>item1</ci><ci>item3</ci><ci>item5</ci></set></set>");
        // var doc=new XmlDocument("<set><set><ci>item2</ci><ci>item0</ci></set><set><ci>item3</ci><ci>item5</ci></set><set><ci>item4</ci><ci>item1</ci></set></set>");
        
        var question = contentService.nextQuestion()
        var doc = new XmlDocument(question.initialState)
        //update question text
        this.titleLabel.setString(question.text)

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
        var slide=new cp.SlideJoint(ps1.refBody, ps2.refBody, cp.vzero, cp.vzero, 200,300);
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
        if(this.touchSprite!=null && this.touchSprite.otherps!=null)
        {
            this.testBrokenBond(this.touchSprite);
            if(this.touchSprite.linkingps!=null) this.testBrokenBond(this.touchSprite.linkingps);
        }

        //draw stuff
        this.drawnode.clear();

        for(var i=0; i<this.allpsprites.length; i++)
        {
            var ps1=this.allpsprites[i];

            if(ps1.otherps!=null)
                this.drawnode.drawSegment(ps1.getPosition(), ps1.otherps.getPosition(), 5, cc.c4b(255, 255, 255, 1));
        }
    },

    testBrokenBond:function(o1){
        var o2=o1.otherps;
        var d=Math.abs(cc.pDistance(o1.getPosition(), o2.getPosition()));
        console.log(d);

        if(d>220)
        {
            //break this object from set
            o1.parentSet.pop(o1);
            o1.parentSet=null;

            //create a new set for this object
            newset=new Array();
            newset.push(o1);

            if(o1.linkingps!=null) newset.push(o1.otherps)
            else newset.push(o1)

            this.allobjects.push(newset);


            this.space.removeConstraint(o1.spring);
            this.space.removeConstraint(o1.slide);
            o1.otherps.linkingps=null;
            o1.otherps=null;
            
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

        else
        {
            this.touching=true;
            this.touchSprite=null;
            for(var i=0; i<this.allpsprites.length; i++)
            {
                var ps=this.allpsprites[i];
                if(cc.rectContainsPoint(ps.getBoundingBox(), touches[0].getLocation()))
                {
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

        this.touching=false;
        this.touchSprite=null;
    },

    onTouchesMoved: function(touches, event) {
        if(this.touchSprite!=null)
        {
            this.touchSprite.setPosition(touches[0].getLocation());
        }
    },


    createPhysicsSprite: function( pos ) {
        var body = new cp.Body(1, cp.momentForBox(1, 103, 103) );
        body.setPos( pos );
        this.space.addBody( body );
        var shape = new cp.BoxShape( body, 103, 103);
        shape.setElasticity( 0.5 );
        shape.setFriction( 0.5 );
        this.space.addShape( shape );

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




