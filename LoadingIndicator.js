Ext.define('Ext.ux.LoadingIndicator', {
    extend: 'Ext.Mask',
    xtype: 'LoadingIndicator',
    alias: 'Loader',

    config: {
        /**
         * @cfg {String} message
         * The text to display in a centered loading message box.
         * @accessor
         */
        message: '',

        /**
         * @cfg {String} cls
         * The CSS Class for this component
         * @accessor
         */
        cls: Ext.baseCSSPrefix + 'loading-indicator',

        /**
         * @cfg {String} messageCls
         * The CSS class to apply to the loading message element.
         * @accessor
         */
        messageCls: Ext.baseCSSPrefix + 'loading-indicator-message',

        /**
         * @cfg {String} name
         * Which type of indicator to use - defaults to ios if not android
         * Also available: bubbles, circles, crescent, dots, lines, ripple, spiral
         * @accessor
         */
        name:  Ext.os.is.android ? 'android' : 'ios'
    },

    template: [
        {
            reference: 'innerElement',
            cls: 'x-mask-inner spinner',
            children: [
                {
                    reference: 'messageElement'
                }
            ]
        }
    ],

    constructor: function(config){
        config = config || {};

        var scope = this;

        scope.abr = {
            a: 'animate',
            an: 'attributeName',
            at: 'animateTransform',
            c: 'circle',
            da: 'stroke-dasharray',
            os: 'stroke-dashoffset',
            f: 'fill',
            lc: 'stroke-linecap',
            rc: 'repeatCount',
            sw: 'stroke-width',
            t: 'transform',
            v: 'values'
        };

        scope.spin = {
            v: '0,32,32;360,32,32',
            an: 'transform',
            type: 'rotate',
            rc: 'indefinite',
            dur: '750ms'
        };

        scope.spinners = {
            android: {
                c: [{
                    sw: 6,
                    da: 128,
                    os: 82,
                    r: 26,
                    cx: 32,
                    cy: 32,
                    f: 'none'
                }]
            },

            ios: {
                sw: 4,
                lc: 'round',
                line: [{
                    fn: function(i) {
                        return {
                            y1: 17,
                            y2: 29,
                            t: 'translate(32,32) rotate(' + (30 * i + (i < 6 ? 180 : -180)) + ')',
                            a: [{
                                fn: function() {
                                    return {
                                        an: 'stroke-opacity',
                                        dur: '750ms',
                                        v: scope.animationValues('0;.1;.15;.25;.35;.45;.55;.65;.7;.85;1', i),
                                        rc: 'indefinite'
                                    };
                                },
                                t: 1
                            }]
                        };
                    },
                    t: 12
                }]
            },

            bubbles: {
                sw: 0,
                c: [{
                    fn: function(i) {
                        return {
                            cx: 24 * Math.cos(2 * Math.PI * i / 8),
                            cy: 24 * Math.sin(2 * Math.PI * i / 8),
                            t: 'translate(32,32)',
                            a: [{
                                fn: function() {
                                    return {
                                        an: 'r',
                                        dur: '750ms',
                                        v: scope.animationValues('1;2;3;4;5;6;7;8', i),
                                        rc: 'indefinite'
                                    };
                                },
                                t: 1
                            }]
                        };
                    },
                    t: 8
                }]
            },

            circles: {
                c: [{
                    fn: function(i) {
                        return {
                            r: 5,
                            cx: 24 * Math.cos(2 * Math.PI * i / 8),
                            cy: 24 * Math.sin(2 * Math.PI * i / 8),
                            t: 'translate(32,32)',
                            sw: 0,
                            a: [{
                                fn: function() {
                                    return {
                                        an: 'fill-opacity',
                                        dur: '750ms',
                                        v: scope.animationValues('.3;.3;.3;.4;.7;.85;.9;1', i),
                                        rc: 'indefinite'
                                    };
                                },
                                t: 1
                            }]
                        };
                    },
                    t: 8
                }]
            },

            crescent: {
                c: [{
                    sw: 4,
                    da: 128,
                    os: 82,
                    r: 26,
                    cx: 32,
                    cy: 32,
                    f: 'none',
                    at: [scope.spin]
                }]
            },

            dots: {
                c: [{
                    fn: function(i) {
                        return {
                            cx: 16 + (16 * i),
                            cy: 32,
                            sw: 0,
                            a: [{
                                fn: function() {
                                    return {
                                        an: 'fill-opacity',
                                        dur: '750ms',
                                        v: scope.animationValues('.5;.6;.8;1;.8;.6;.5', i),
                                        rc: 'indefinite'
                                    };
                                },
                                t: 1
                            }, {
                                fn: function() {
                                    return {
                                        an: 'r',
                                        dur: '750ms',
                                        v: scope.animationValues('4;5;6;5;4;3;3', i),
                                        rc: 'indefinite'
                                    };
                                },
                                t: 1
                            }]
                        };
                    },
                    t: 3
                }]
            },

            lines: {
                sw: 7,
                lc: 'round',
                line: [{
                    fn: function(i) {
                        return {
                            x1: 10 + (i * 14),
                            x2: 10 + (i * 14),
                            a: [{
                                fn: function() {
                                    return {
                                        an: 'y1',
                                        dur: '750ms',
                                        v: scope.animationValues('16;18;28;18;16', i),
                                        rc: 'indefinite'
                                    };
                                },
                                t: 1
                            }, {
                                fn: function() {
                                    return {
                                        an: 'y2',
                                        dur: '750ms',
                                        v: scope.animationValues('48;44;36;46;48', i),
                                        rc: 'indefinite'
                                    };
                                },
                                t: 1
                            }, {
                                fn: function() {
                                    return {
                                        an: 'stroke-opacity',
                                        dur: '750ms',
                                        v: scope.animationValues('1;.8;.5;.4;1', i),
                                        rc: 'indefinite'
                                    };
                                },
                                t: 1
                            }]
                        };
                    },
                    t: 4
                }]
            },

            ripple: {
                f: 'none',
                'fill-rule': 'evenodd',
                sw: 3,
                circle: [{
                    fn: function(i) {
                        return {
                            cx: 32,
                            cy: 32,
                            a: [{
                                fn: function() {
                                    return {
                                        an: 'r',
                                        begin: (i * -1) + 's',
                                        dur: '2s',
                                        v: '0;24',
                                        keyTimes: '0;1',
                                        keySplines: '0.1,0.2,0.3,1',
                                        calcMode: 'spline',
                                        rc: 'indefinite'
                                    };
                                },
                                t: 1
                            }, {
                                fn: function() {
                                    return {
                                        an: 'stroke-opacity',
                                        begin: (i * -1) + 's',
                                        dur: '2s',
                                        v: '.2;1;.2;0',
                                        rc: 'indefinite'
                                    };
                                },
                                t: 1
                            }]
                        };
                    },
                    t: 2
                }]
            },

            spiral: {
                defs: [{
                    linearGradient: [{
                        id: 'sGD',
                        gradientUnits: 'userSpaceOnUse',
                        x1: 55,
                        y1: 46,
                        x2: 2,
                        y2: 46,
                        stop: [{
                            offset: 0.1,
                            class: 'stop1'
                        }, {
                            offset: 1,
                            class: 'stop2'
                        }]
                    }]
                }],
                g: [{
                    sw: 4,
                    lc: 'round',
                    f: 'none',
                    path: [{
                        stroke: 'url(#sGD)',
                        d: 'M4,32 c0,15,12,28,28,28c8,0,16-4,21-9'
                    }, {
                        d: 'M60,32 C60,16,47.464,4,32,4S4,16,4,32'
                    }],
                    at: [scope.spin]
                }]
            }

        };

        scope.animations = {
            android: function(element) {
                var rIndex = 0;
                var rotateCircle = 0;
                var startTime;
                var svgEle = element.querySelector('g');
                var circleEle = element.querySelector('circle');

                function run() {
                    var v = scope.easeInOutCubic(Date.now() - startTime, 650);
                    var scaleX = 1;
                    var translateX = 0;
                    var dasharray = (188 - (58 * v));
                    var dashoffset = (182 - (182 * v));

                    if (rIndex % 2) {
                        scaleX = -1;
                        translateX = -64;
                        dasharray = (128 - (-58 * v));
                        dashoffset = (182 * v);
                    }

                    var rotateLine = [0, -101, -90, -11, -180, 79, -270, -191][rIndex];

                    scope.setSvgAttribute(circleEle, 'da', Math.max(Math.min(dasharray, 188), 128));
                    scope.setSvgAttribute(circleEle, 'os', Math.max(Math.min(dashoffset, 182), 0));
                    scope.setSvgAttribute(circleEle, 't', 'scale(' + scaleX + ',1) translate(' + translateX + ',0) rotate(' + rotateLine + ',32,32)');

                    rotateCircle += 4.1;

                    if (rotateCircle > 359) {
                        rotateCircle = 0;
                    }

                    scope.setSvgAttribute(svgEle, 't', 'rotate(' + rotateCircle + ',32,32)');

                    if (v >= 1) {
                        rIndex++;
                        if (rIndex > 7) rIndex = 0;
                        startTime = Date.now();
                    }

                    requestAnimationFrame(run);
                }

                return function() {
                    startTime = Date.now();
                    run();
                };
            }
        };

        this.callParent([config]);
    },

    initialize: function() {
        var element = this.createSvgElement(
            'svg', 
            {
                viewBox: '0 0 64 64', 
                g: [this.spinners[this.getName()]]
            },
            this.innerElement,
            this.getName()
        );

        if(this.animations[this.getName()]){
            this.animations[this.getName()](element)();
        }
    },

    // @private
    createSvgElement: function(tagName, data, parent, name) {
        var element = document.createElementNS("http://www.w3.org/2000/svg", this.abr[tagName] || tagName);
        var k, x, y;

        for (k in data) {
            if (Ext.isArray(data[k])) {
                for (x = 0; x < data[k].length; x++) {
                    if (data[k][x].fn) {
                        for (y = 0; y < data[k][x].t; y++) {
                            this.createSvgElement(k, data[k][x].fn(y, name), element, name);
                        }
                    } else {
                        this.createSvgElement(k, data[k][x], element, name);
                    }
                }
            } else {
                this.setSvgAttribute(element, k, data[k]);
            }
        }

        parent.appendChild(element);

        return element;
    },

    // @private
    setSvgAttribute: function(element, k, v) {
        element.setAttribute(this.abr[k] || k, v);
    },

    // @private
    animationValues: function(strValues, i) {
        var values = strValues.split(';');
        var back = values.slice(i);
        var front = values.slice(0, values.length - back.length);
        values = back.concat(front).reverse();
        return values.join(';') + ';' + values[0];
    },

    // @private
    easeInOutCubic: function(t, c) {
        t /= c / 2;
        if (t < 1) return 1 / 2 * t * t * t;
        t -= 2;
        return 1 / 2 * (t * t * t + 2);
    },

    /*
     * Updates the message element with the new value of the {@link #message} configuration
     * @private
     */
    updateMessage: function(newMessage) {
        var cls = Ext.baseCSSPrefix + 'has-message';

        if (newMessage) {
            this.addCls(cls);
        } else {
            this.removeCls(cls);
        }

        this.messageElement.setHtml(newMessage);
    },

    /**
     * Replaces the cls of the message element with the value of the {@link #messageCls} configuration.
     * @private
     */
    updateMessageCls: function(newMessageCls, oldMessageCls) {
        this.messageElement.replaceCls(oldMessageCls, newMessageCls);
    },

    /**
     * Shows or hides the loading indicator when the {@link #indicator} configuration is changed.
     * @private
     */
    updateIndicator: function(newIndicator) {
        this[newIndicator ? 'removeCls' : 'addCls'](Ext.baseCSSPrefix + 'indicator-hidden');
    }

});
