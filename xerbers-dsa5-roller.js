class xdsa5r {

    static async Init(controls, html) {
     const diceRollbtn = $(
            `
            <li class="scene-control sdr-scene-control" data-control="xerber-dice-roller" title="DSA5 Dice Roller">
                <i class="fas fa-dice-d20"></i>
            </li>
            `
        );
        const diceRollControls = `
            <ol class="sub-controls app control-tools sdr-sub-controls">
                <li id="SDRpopup" class="xerber-dice-roller-popup control-tool">
                </li>
            </ol>
        `;

        html.find(".main-controls").append(diceRollbtn);
        html.append(diceRollControls);

        diceRollbtn[0].addEventListener('click', ev => this.PopupSheet(ev, html));

        this._createDiceTable(html);
    }

    static _createDiceTableHtmlOneCell(diceType, diceRoll, isLast) {

        let s = [];
        s.push('<li data-dice-type="', diceType, '" data-dice-roll="', diceRoll, '"');

	
        if (diceRoll == 1) {
			var symbol = "";
            s.push(' class="sdr-col1">');
            if (diceType == 'Ja/Nein') {
				s.push('<i ', diceType, '" data-dice-roll="1"></i>');
				s.push('M&uumlnzwurf');
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
            if (diceType != 'Ja/Nein') {             
		        var attach = diceRoll;
			    attach = attach -1;
				s.push(' class="sdr-lastcol">' + '+' + attach);
                //console.log("xerber formula =  ", "1");		
            } 	
        } 
		else {
            if (diceType != 'Ja/Nein') {
			    var attach = diceRoll;
			    attach = attach -1;
				//s.push('<i class="df-dot-d6-1" data-dice-type="', diceType, '" data-dice-roll="1"></i>');
				//s.push('<i class="df-dot-d6-2" data-dice-type="', diceType, '" data-dice-roll="1"></i>');
			    s.push('>' + '+' + attach);
                //console.log("xerber formula =  ", "2");	
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

    static _createDiceTableHtml(maxDiceCount, enableLowLeP, enableLeP, enableAsP, enable1W20, enable1W6, enable2W6, enable3W6, enableCoinflip) {

        let s = [];

       
        if (enableLeP == false) {
			s.push(this._createDiceTableHtmlOneLine('LeP', maxDiceCount));
		}
		if (enableAsP == false) {
			s.push(this._createDiceTableHtmlOneLine('AsP', maxDiceCount));
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
			s.push(this._createDiceTableHtmlOneLine('Ja/Nein', 1));
		}		
		 
		 
		 
        return s.join('');
    }

    static _cachedMaxDiceCount = NaN;
    static _cachedenableLowLeP = false;
	static _cachedenableLeP = false;
	static _cachedenableAsP = false;
	static _cachedenable1W20 = false;
	static _cachedenable1W6 = false;
	static _cachedenable2W6 = false;
	static _cachedenable3W6 = false;
	static _cachedCoinflip = false;	

    static async _createDiceTable(html) {

        let maxDiceCount = parseInt(game.settings.get("xerber-dice-roller", "maxDiceCount"), 10);

        let enableLowLeP = Boolean(game.settings.get("xerber-dice-roller", "enableLowLeP"));

		let enableLeP = Boolean(game.settings.get("xerber-dice-roller", "enableLeP"));
		
		let enableAsP = Boolean(game.settings.get("xerber-dice-roller", "enableAsP"));
		
		let enable1W20 = Boolean(game.settings.get("xerber-dice-roller", "enable1W20"));
				
		let enable1W6 = Boolean(game.settings.get("xerber-dice-roller", "enable1W6"));
						
		let enable2W6 = Boolean(game.settings.get("xerber-dice-roller", "enable2W6"));
								
		let enable3W6 = Boolean(game.settings.get("xerber-dice-roller", "enable3W6"));

		let enableCoinflip = Boolean(game.settings.get("xerber-dice-roller", "enableCoinflip"));

        if (isNaN(maxDiceCount) || (maxDiceCount < 1) || (maxDiceCount > 30)) {
            maxDiceCount = 5;
        }

        this._cachedMaxDiceCount = maxDiceCount;

        this._cachedenableLowLeP = enableLowLeP;
		
		this._cachedenableLeP = enableLeP;
		
		this._cachedenableAsP = enableAsP;
		
		this._cachedenable1W20 = enable1W20;
				
		this._cachedenable1W6 = enable1W6;
						
		this._cachedenable2W6 = enable2W6;
								
		this._cachedenable3W6 = enable3W6;
		
		this._cachedCoinflip = enableCoinflip;
		
        const tableContentsHtml = this._createDiceTableHtml(maxDiceCount, enableLowLeP, enableLeP, enableAsP, enable1W20, enable1W6, enable2W6, enable3W6, enableCoinflip);

        const tableContents = $(tableContentsHtml);

        html.find('.xerber-dice-roller-popup ul').remove();

        html.find('.xerber-dice-roller-popup').append(tableContents);

        html.find('.xerber-dice-roller-popup li').click(ev => this._rollDice(ev, html, enableLowLeP));
    }

    static async _rollDice(event, html, enableLowLeP) {
	
        var diceType = event.target.dataset.diceType;
        var diceRoll = event.target.dataset.diceRoll;
		var formula = "";
		
		//console.log("xerber diceType = ", diceType);
		//console.log("xerber diceRole = ", diceRoll);
		//console.log("xerber enableLowLeP = ", enableLowLeP);
		if (diceType == 'Ja/Nein') {
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
	    //console.log("xerber formula =  ", formula);		
        
		let r = new Roll(formula);

        r.toMessage({
            user: game.user._id,
        })

        this._close(event, html);

    }

    static async PopupSheet(event, html) {
        console.log("SDR | clicked");
        //canvas.stage.children.filter(layer => layer._active).forEach(layer => layer.deactivate());
        if (html.find('.sdr-scene-control').hasClass('active')) {
            this._close(event, html);
        } else {
            this._open(event, html);
        }
    }

    static async _close(event, html) {
        console.log("SDR | closed");
        //html.find('#SDRpopup').hide();
        html.find('.sdr-scene-control').removeClass('active');
        html.find('.sdr-sub-controls').removeClass('active');
        html.find('.scene-control').first().addClass('active');

        event.stopPropagation();
    }

    static async _open(event, html) {
        console.log("SDR | opened");
        this._createDiceTable(html);
        html.find('.scene-control').removeClass('active');
        html.find('.sub-controls').removeClass('active');
        //html.find('#SDRpopup').show();
        html.find('.sdr-scene-control').addClass('active');
        html.find('.sdr-sub-controls').addClass('active');
        event.stopPropagation();
    }


}

Hooks.on('renderSceneControls', (controls, html) => {
    //console.log("SDR here", html);
    xdsa5r.Init(controls, html);
});

Hooks.once("init", () => {
    game.settings.register("xerber-dice-roller", "maxDiceCount", {
        name: game.i18n.localize("xdsa5r.maxDiceCount.name"),
        hint: game.i18n.localize("xdsa5r.maxDiceCount.hint"),
        scope: "world",
        config: true,
        default: 10,
        type: Number
    });
    game.settings.register("xerber-dice-roller", "enableLowLeP", {
        name: game.i18n.localize("xdsa5r.enableLowLeP.name"),
		hint: game.i18n.localize("xdsa5r.enableLowLeP.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
	game.settings.register("xerber-dice-roller", "enableLeP", {
        name: game.i18n.localize("xdsa5r.enableLeP.name"),
		hint: game.i18n.localize("xdsa5r.enableLeP.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
	game.settings.register("xerber-dice-roller", "enableAsP", {
        name: game.i18n.localize("xdsa5r.enableAsP.name"),
		hint: game.i18n.localize("xdsa5r.enableAsP.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
	game.settings.register("xerber-dice-roller", "enable1W20", {
        name: game.i18n.localize("xdsa5r.enable1W20.name"),
		hint: game.i18n.localize("xdsa5r.enable1W20.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
	game.settings.register("xerber-dice-roller", "enable1W6", {
        name: game.i18n.localize("xdsa5r.enable1W6.name"),
		hint: game.i18n.localize("xdsa5r.enable1W6.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
	game.settings.register("xerber-dice-roller", "enable2W6", {
        name: game.i18n.localize("xdsa5r.enable2W6.name"),
		hint: game.i18n.localize("xdsa5r.enable2W6.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
	game.settings.register("xerber-dice-roller", "enable3W6", {
        name: game.i18n.localize("xdsa5r.enable3W6.name"),
		hint: game.i18n.localize("xdsa5r.enable3W6.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
	game.settings.register("xerber-dice-roller", "enableCoinflip", {
        name: game.i18n.localize("xdsa5r.enableCoinflip.name"),
		hint: game.i18n.localize("xdsa5r.enableCoinflip.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
});

//console.log("SDR | xerber Dice Roller loaded");