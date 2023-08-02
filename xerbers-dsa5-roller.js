class DSA5DiceRoller {
	
	
    static async Init(controls, html) {
	 const diceRollbtn = $(
            `
            <li class="scene-control xdsa5r-scene-control" data-control="xerbers-dsa5-roller" title="DSA5 Dice Roller">
                <i class="fas fa-dice-d20"></i>
            </li>
            `
        );
        const diceRollControls = `
            <ol class="sub-controls app control-tools xdsa5r-sub-controls">
                <li id="XDSA5Rpopup" class="xdsa5r-popup control-tool">
                </li>
            </ol>
        `;

        html.find(".main-controls").append(diceRollbtn);
        html.append(diceRollControls);
		var popupactive = true;
        diceRollbtn[0].addEventListener('click', ev => this.PopupSheet(ev, html));

        this._createDiceTable(html);
    }

    static _createDiceTableHtmlOneCell(diceType, diceRoll, isLast) {

        let s = [];
        s.push('<li data-dice-type="', diceType, '" data-dice-roll="', diceRoll, '"');

        if (diceRoll == 1) {
			var symbol = "";
            s.push(' class="xdsa5r-col1">');
            if (diceType == 'Coinflip') {
				s.push('<i ', diceType, '" data-dice-roll="1"></i>');
				s.push('M&uuml;nzwurf');
				symbol = diceType;
            } 			
			else if (diceType == 'LeP') {
                s.push('<i ', diceType, '" data-dice-roll="1"></i>');
				s.push('LeP');
				symbol = diceType;
			}
			else if (diceType == 'AsP') {
                s.push('<i ', diceType, '" data-dice-roll="1"></i>');
				s.push('AsP');
				symbol = diceType;
			}
			else if (diceType == 'KaP') {
                s.push('<i ', diceType, '" data-dice-roll="1"></i>');
				s.push('KaP');
				symbol = diceType;
			}
			else if (diceType == '1W6') {
				s.push('<i class="df-dot-d6-6" data-dice-type="', diceType, '" data-dice-roll="1"></i>');
				symbol = diceType;
			} 
			else if (diceType == '2W6') {
				s.push('<i class="df-dot-d6-6" data-dice-type="', diceType, '" data-dice-roll="1"></i>');
				s.push('<i class="df-dot-d6-6" data-dice-type="', diceType, '" data-dice-roll="1"></i>');
				symbol = diceType;
			} 
			else if (diceType == '3W6') {
                s.push('<i class="df-dot-d6-6" data-dice-type="', diceType, '" data-dice-roll="1"></i>');
				s.push('<i class="df-dot-d6-6" data-dice-type="', diceType, '" data-dice-roll="1"></i>');
				s.push('<i class="df-dot-d6-6" data-dice-type="', diceType, '" data-dice-roll="1"></i>');
				symbol = diceType;
			} 			
			else if (diceType == '1W20') {
                s.push('<i class="df-d20-20" data-dice-type="', diceType, '" data-dice-roll="1"></i>');
				symbol = diceType;				
			}
        } else if (isLast) {
            if (diceType != 'Coinflip') {             
		        var attach = diceRoll;
			    attach = attach -1;
				s.push(' class="xdsa5r-lastcol">' + '&plusmn;' + attach);	
            } 	
        } 
		else {
            if (diceType != 'Coinflip') {
			    var attach = diceRoll;
			    attach = attach -1;
				s.push('>' + '&plusmn;' + attach);	
            } 		
        }
        s.push('</li>');

        return s.join('');
    }

    static _createDiceTableHtmlOneLine(diceType, maxDiceCount) {

        let s = [];

        s.push('<ul>');

        for (let i = 1; i <= maxDiceCount; ++i) {
            let isLast = (i == maxDiceCount);
            s.push(this._createDiceTableHtmlOneCell(diceType, i, isLast));
        }

        s.push('</ul>');

        return s.join('');
    }

    static _createDiceTableHtml(maxDiceCount, enableLowLeP, enableLeP, enableAsP, enableKaP, enable1W20, enable1W6, enable2W6, enable3W6, enableCoinflip) {

        let s = [];

        if (enableLeP == false) {
			s.push(this._createDiceTableHtmlOneLine('LeP', maxDiceCount));
		}
		if (enableAsP == false) {
			s.push(this._createDiceTableHtmlOneLine('AsP', maxDiceCount));
		}
		if (enableKaP == false) {
			s.push(this._createDiceTableHtmlOneLine('KaP', maxDiceCount));
		}
		if (enable1W20 == false) {
			s.push(this._createDiceTableHtmlOneLine('1W20', maxDiceCount));
		}
		if (enable1W6== false) {
			s.push(this._createDiceTableHtmlOneLine('1W6', maxDiceCount));
		}
		if (enable2W6 == false) {
			s.push(this._createDiceTableHtmlOneLine('2W6', maxDiceCount));
		}
		if (enable3W6 == false) {
			s.push(this._createDiceTableHtmlOneLine('3W6', maxDiceCount));
		}
		if (enableCoinflip == false) {
			s.push(this._createDiceTableHtmlOneLine('Coinflip', 1));
		}		
		
        return s.join('');
    }

    static _cachedMaxDiceCount = NaN;
    static _cachedenableLowLeP = false;
	static _cachedenableLeP = false;
	static _cachedenableAsP = false;
	static _cachedenableKaP = false;
	static _cachedenable1W20 = false;
	static _cachedenable1W6 = false;
	static _cachedenable2W6 = false;
	static _cachedenable3W6 = false;
	static _cachedCoinflip = false;	

    static async _createDiceTable(html) {

        let maxDiceCount = parseInt(game.settings.get("xerbers-dsa5-roller", "maxDiceCount"), 10);

        let enableLowLeP = Boolean(game.settings.get("xerbers-dsa5-roller", "enableLowLeP"));

		let enableLeP = Boolean(game.settings.get("xerbers-dsa5-roller", "enableLeP"));
		
		let enableAsP = Boolean(game.settings.get("xerbers-dsa5-roller", "enableAsP"));
		
		let enableKaP = Boolean(game.settings.get("xerbers-dsa5-roller", "enableKaP"));
		
		let enable1W20 = Boolean(game.settings.get("xerbers-dsa5-roller", "enable1W20"));
				
		let enable1W6 = Boolean(game.settings.get("xerbers-dsa5-roller", "enable1W6"));
						
		let enable2W6 = Boolean(game.settings.get("xerbers-dsa5-roller", "enable2W6"));
								
		let enable3W6 = Boolean(game.settings.get("xerbers-dsa5-roller", "enable3W6"));

		let enableCoinflip = Boolean(game.settings.get("xerbers-dsa5-roller", "enableCoinflip"));

        if (isNaN(maxDiceCount)) { maxDiceCount = 10; }
		if (maxDiceCount < 1) { maxDiceCount = 1; }
		if (maxDiceCount > 10) { maxDiceCount = 10; }
		
        this._cachedMaxDiceCount = maxDiceCount;
        this._cachedenableLowLeP = enableLowLeP;
		this._cachedenableLeP = enableLeP;
		this._cachedenableAsP = enableAsP;
		this._cachedenableKaP = enableKaP;
		this._cachedenable1W20 = enable1W20;
		this._cachedenable1W6 = enable1W6;
		this._cachedenable2W6 = enable2W6;		
		this._cachedenable3W6 = enable3W6;
		this._cachedCoinflip = enableCoinflip;
		
        const tableContentsHtml = this._createDiceTableHtml(maxDiceCount, enableLowLeP, enableLeP, enableAsP, enableKaP, enable1W20, enable1W6, enable2W6, enable3W6, enableCoinflip);
		const tableContents = $(tableContentsHtml);

        html.find('.xdsa5r-popup ul').remove();

        html.find('.xdsa5r-popup').append(tableContents);

        html.find('.xdsa5r-popup li').click(ev => this._rollDice(ev, html, enableLowLeP, true));
		
		html.find('.xdsa5r-popup li').contextmenu(ev => this._rollDice(ev, html, enableLowLeP, false));
		
    }

    static async _rollDice(event, html, enableLowLeP, mouseclick) {
	
        var diceType = event.target.dataset.diceType;
        var diceRoll = event.target.dataset.diceRoll;
		var formula = "";
		//console.log("DSA5 Dice Roller - mouseclick", mouse);
		//console.log("DSA5 Dice Roller - diceType", diceType);
		//console.log("DSA5 Dice Roller - diceRole", diceRoll);
		//console.log("DSA5 Dice Roller - enableLowLeP", enableLowLeP);
		if (diceType == 'Coinflip') {
			formula = "1d2";
		}
		if (diceType == 'LeP') {
			if (enableLowLeP == true) {
				formula = "1d3";			
			} else {
				formula = "1d6";
			}
		}		
		if (diceType == 'AsP') {
			formula = "1d6";
		}
		if (diceType == 'KaP') {
			formula = "1d6";
		}
		if (diceType == '1W20') {
			formula = "1d20";
		}			
		if (diceType == '1W6') {
			formula = "1d6";
		}
		if (diceType == '2W6') {
			formula = "2d6";
		}
		if (diceType == '3W6') {
			formula = "3d6";
		}
		if (diceRoll != 1) {
			var addon = diceRoll -1; 
            formula = formula + '+' + addon;
		}	
        if (mouseclick == false) {
			formula = formula.replace("+", "-");
		}
		//console.log("DSA5 Dice Roller - formula", formula);		
		let r = new Roll(formula);

        r.toMessage({
            user: game.user._id,
        })

        this._close(event, html);

    }

    static async PopupSheet(event, html) {
		//console.log("DSA5 Dice Roller - HTML", html);
		//console.log("DSA5 Dice Roller - PopupSheet clicked");
		//canvas.stage.children.filter(layer => layer._active).forEach(layer => layer.deactivate());
        if (html.find('.xdsa5r-sub-controls').hasClass('active')) {
            this._close(event, html);
        } else {
            this._open(event, html);
        }
		
    }

    static async _close(event, html) {
		console.log("DSA5 Dice Roller - PopupSheet closed");
		//html.find('#XDSA5Rpopup').hide();
        html.find('.xdsa5r-scene-control').removeClass('active');
        html.find('.xdsa5r-sub-controls').removeClass('active');
        html.find('.scene-control').first().addClass('active');
        event.stopPropagation();
    }

    static async _open(event, html) {
		//console.log("DSA5 Dice Roller - popupactive", popupactive);
        //console.log("DSA5 Dice Roller - Event opened");
        this._createDiceTable(html);
        html.find('.scene-control').removeClass('active');
        html.find('.sub-controls').removeClass('active');
        //html.find('#XDSA5Rpopup').show();
        html.find('.xdsa5rscene-control').addClass('active');
        html.find('.xdsa5r-sub-controls').addClass('active');
        event.stopPropagation();
    }


}

Hooks.on('renderSceneControls', (controls, html) => {
    //console.log("DSA5 Dice Roller - rendernSceneControls HTML", html);
	//console.log("DSA5 Dice Roller - rendernSceneControls Controls", controls);
    DSA5DiceRoller.Init(controls, html);
});
	
Hooks.once("init", () => {
    
	game.settings.register("xerbers-dsa5-roller", "maxDiceCount", {
        name: game.i18n.localize("xdsa5r.maxDiceCount.name"),
        hint: game.i18n.localize("xdsa5r.maxDiceCount.hint"),
        scope: "world",
        config: true,
        default: 9,
        type: Number
    });
    game.settings.register("xerbers-dsa5-roller", "enableLowLeP", {
        name: game.i18n.localize("xdsa5r.enableLowLeP.name"),
		hint: game.i18n.localize("xdsa5r.enableLowLeP.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
	game.settings.register("xerbers-dsa5-roller", "enableLeP", {
        name: game.i18n.localize("xdsa5r.enableLeP.name"),
		hint: game.i18n.localize("xdsa5r.enableLeP.hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
	game.settings.register("xerbers-dsa5-roller", "enableAsP", {
        name: game.i18n.localize("xdsa5r.enableAsP.name"),
		hint: game.i18n.localize("xdsa5r.enableAsP.hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
	game.settings.register("xerbers-dsa5-roller", "enableKaP", {
        name: game.i18n.localize("xdsa5r.enableKaP.name"),
		hint: game.i18n.localize("xdsa5r.enableKaP.hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
	game.settings.register("xerbers-dsa5-roller", "enable1W20", {
        name: game.i18n.localize("xdsa5r.enable1W20.name"),
		hint: game.i18n.localize("xdsa5r.enable1W20.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
	game.settings.register("xerbers-dsa5-roller", "enable1W6", {
        name: game.i18n.localize("xdsa5r.enable1W6.name"),
		hint: game.i18n.localize("xdsa5r.enable1W6.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
	game.settings.register("xerbers-dsa5-roller", "enable2W6", {
        name: game.i18n.localize("xdsa5r.enable2W6.name"),
		hint: game.i18n.localize("xdsa5r.enable2W6.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
	game.settings.register("xerbers-dsa5-roller", "enable3W6", {
        name: game.i18n.localize("xdsa5r.enable3W6.name"),
		hint: game.i18n.localize("xdsa5r.enable3W6.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
	game.settings.register("xerbers-dsa5-roller", "enableCoinflip", {
        name: game.i18n.localize("xdsa5r.enableCoinflip.name"),
		hint: game.i18n.localize("xdsa5r.enableCoinflip.hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
});

//console.log("DSA5 Dice Roller - loaded");