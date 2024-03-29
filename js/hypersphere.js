  var mathbox = mathBox({
      // plugins: ['core', 'controls', 'cursor'],
      plugins: ['core'],
      controls: {
        klass: THREE.TrackballControls,
        parameters: {
          noZoom: true
        },
      },
      mathbox: {
        warmup: 1
      },
      loop: {
        start: window == window.top
      },
    });

    mathbox.three.renderer.setClearColor(new THREE.Color(0x24180D), 1.0);

    var red = '#044C29';
    var green = '#167F39';
    var blue = '#45BF55';

    view = mathbox
      .set({
        scale: 300,
      })
      .camera({
        proxy: true,
        position: [0, 0, 3],
      })
      .clock({
        speed: .09
      })
      .stereographic4({
        bend: 1
      })
        .shader({
          code: [
            "uniform float cos1;",
            "uniform float sin1;",
            "uniform float cos2;",
            "uniform float sin2;",
            "uniform float cos3;",
            "uniform float sin3;",
            "uniform float cos4;",
            "uniform float sin4;",
            "",
            "vec4 getRotate4D(vec4 xyzw, inout vec4 stpq) {",
            "  xyzw.xy = xyzw.xy * mat2(cos1, sin1, -sin1, cos1);",
            "  xyzw.zw = xyzw.zw * mat2(cos2, sin2, -sin2, cos2);",
            "  xyzw.xz = xyzw.xz * mat2(cos3, sin3, -sin3, cos3);",
            "  xyzw.yw = xyzw.yw * mat2(cos4, sin4, -sin4, cos4);",
            "",
            "  return xyzw;",
            "}",
          ].join("\n")
        }, {
          cos1: function (t) { return Math.cos(t * .111); },
          sin1: function (t) { return Math.sin(t * .111); },
          cos2: function (t) { return Math.cos(t * .151 + 1); },
          sin2: function (t) { return Math.sin(t * .151 + 1); },
          cos3: function (t) { return Math.cos(t * .071 + Math.sin(t * .081)); },
          sin3: function (t) { return Math.sin(t * .071 + Math.sin(t * .081)); },
          cos4: function (t) { return Math.cos(t * .053 + Math.sin(t * .066) + 1); },
          sin4: function (t) { return Math.sin(t * .053 + Math.sin(t * .066) + 1); },
        })
        .vertex();

    var q1 = new THREE.Quaternion();
    var q2 = new THREE.Quaternion();

    view.area({
      rangeX: [-π/2, π/2],
      rangeY: [0, 2*π],
      width:  129,
      height: 65,
      expr: function (emit, θ, ϕ, i, j) {
        q1.set(0, 0, Math.sin(θ), Math.cos(θ));
        q2.set(0, Math.sin(ϕ), 0, Math.cos(ϕ));
        q1.multiply(q2);
        emit(q1.x, q1.y, q1.z, q1.w);
      },
      live: false,
      channels: 4,
    });
    view.line({
      color: blue,
    });
    
    // ===========================================================================
    
    view.area({
      rangeX: [-π/2, π/2],
      rangeY: [0, 2*π],
      width:  129,
      height: 65,
      expr: function (emit, θ, ϕ, i, j) {
        q1.set(0, Math.sin(θ), 0, Math.cos(θ));
        q2.set(Math.sin(ϕ), 0, 0, Math.cos(ϕ));
        q1.multiply(q2);
        emit(q1.x, q1.y, q1.z, q1.w);
      },
      live: false,
      channels: 4,
    });
    view.line({
      color: green,
    });
    
    // ===========================================================================
  
    view.area({
      rangeX: [-π/2, π/2],
      rangeY: [0, 2*π],
      width:  129,
      height: 65,
      expr: function (emit, θ, ϕ, i, j) {
        q1.set(Math.sin(θ), 0, 0, Math.cos(θ));
        q2.set(0, 0, Math.sin(ϕ), Math.cos(ϕ));
        q1.multiply(q2);
        emit(q1.x, q1.y, q1.z, q1.w);
      },
      live: false,
      channels: 4,
    });
    view.line({
      color: red,
    });
  
    // ===========================================================================
