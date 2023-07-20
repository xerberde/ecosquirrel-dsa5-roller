class xerbers-dsa5-roller {

    static async Init(controls, html) {
		const enableFateDice = true
     const diceRollbtn = $(
            `
            <li class="scene-control xerber-scene-control" data-control="xerber-dsa5-roller" title="DSA5 Dice Roller">
                <i class="fas fa-dice-d20"></i>
            </li>
            `
        );
        const diceRollControls = `
            <ol class="sub-controls app control-tools xerber-sub-controls">
                <li id="xerberpopup" class="xerber-dsa5-roller-popup control-tool">
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
            s.push(' class="xerber-col1">');
            if (diceType == 'Ja/Nein') {
                s.push('<i ', diceType, '" data-dice-roll="1"></i>');
				s.push('Ja/Nein');
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
			    s.push(' class="xerber-lastcol">' + '+' + attach);
                //console.log("xerber formula =  ", "1");		
            } 	
        } else {
            if (diceType != 'Ja/Nein') {
			    var attach = diceRoll;
			    attach = attach -1;
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

    static _createDiceTableHtml(maxDiceCount, enableFateDice) {

        let s = [];

        //s.push(this._createDiceTableHtmlOneLine('Ja/Nein', maxDiceCount));
        s.push(this._createDiceTableHtmlOneLine('LeP', maxDiceCount));
		s.push(this._createDiceTableHtmlOneLine('AsP', maxDiceCount));
		s.push(this._createDiceTableHtmlOneLine('1W20', maxDiceCount));
		s.push(this._createDiceTableHtmlOneLine('1W6', maxDiceCount));
		s.push(this._createDiceTableHtmlOneLine('2W6', maxDiceCount));
		s.push(this._createDiceTableHtmlOneLine('3W6', maxDiceCount));


        return s.join('');
    }

    static _cachedMaxDiceCount = NaN;
    static _cachedEnableFateDice = false;

    static async _createDiceTable(html) {

        let maxDiceCount = parseInt(game.settings.get("xerber-dsa5-roller", "maxDiceCount"), 10);

        let enableFateDice = Boolean(game.settings.get("xerber-dsa5-rollerr", "enableFateDice"));

        if (isNaN(maxDiceCount) || (maxDiceCount < 1) || (maxDiceCount > 30)) {
            maxDiceCount = 5;
        }

        this._cachedMaxDiceCount = maxDiceCount;

        this._cachedEnableFateDice = enableFateDice;

        const tableContentsHtml = this._createDiceTableHtml(maxDiceCount, enableFateDice);

        const tableContents = $(tableContentsHtml);

        html.find('.xerber-dsa5-roller-popup ul').remove();

        html.find('.xerber-dsa5-roller-popup').append(tableContents);

        html.find('.xerber-dsa5-roller-popup li').click(ev => this._rollDice(ev, html));
    }

    static async _rollDice(event, html) {
	
        var diceType = event.target.dataset.diceType;
        var diceRoll = event.target.dataset.diceRoll;
		var formula = "";
		
		//console.log("xerber diceType = ", diceType);
		//console.log("xerber diceRole = ", diceRoll);
		
		if (diceType == 'Ja/Nein') {
			formula = "1d2";
		}
		if (diceType == 'LeP') {
			formula = "1d3";
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
        console.log("xerber | clicked");
        //canvas.stage.children.filter(layer => layer._active).forEach(layer => layer.deactivate());
        if (html.find('.xerber-scene-control').hasClass('active')) {
            this._close(event, html);
        } else {
            this._open(event, html);
        }
    }

    static async _close(event, html) {
        //console.log("xerber | closed");
        //html.find('#xerberpopup').hide();
        html.find('.xerber-scene-control').removeClass('active');
        html.find('.xerber-sub-controls').removeClass('active');
        html.find('.scene-control').first().addClass('active');

        event.stopPropagation();
    }

    static async _open(event, html) {
        //console.log("xerber | opened");
        this._createDiceTable(html);
        html.find('.scene-control').removeClass('active');
        html.find('.sub-controls').removeClass('active');
        //html.find('#xerberpopup').show();
        html.find('.xerber-scene-control').addClass('active');
        html.find('.xerber-sub-controls').addClass('active');
        event.stopPropagation();
    }


}

Hooks.on('renderSceneControls', (controls, html) => {
    //console.log("xerber here", html);
    xerberdsa5roller.Init(controls, html);
});

Hooks.once("init", () => {
    game.settings.register("xerber-dsa5-roller", "maxDiceCount", {
        name: game.i18n.localize("xerberdsa5roller.maxDiceCount.name"),
        hint: game.i18n.localize("xerberdsa5roller.maxDiceCount.hint"),
        scope: "world",
        config: true,
        default: 8,
        type: Number
    });
   game.settings.register("xerber-dsa5-roller", "enableFateDice", {
        name: game.i18n.localize("xerberdsa5roller.enableFateDice.name"),
		hint: game.i18n.localize("xerberdsa5roller.enableFateDice.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
});

//console.log("xerber | xerber-dsa5-roller loaded");