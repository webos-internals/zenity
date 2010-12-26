/*
 * launcher
 */

function launcher(assistant, params)
{
	launcher.num++;
	this.num =				launcher.num;
	this.params =			params;
	
	this.responded =		false;
	
	Mojo.Log.error("params");
	Mojo.Log.error("%j", params);
	
	this.stageName =		'zenity-' + this.num;
	this.assistant =		assistant;
	this.scene =			false;
	
	this.type = false;
	// messages
	if (params.error)		this.type = 'error';
	if (params.info)		this.type = 'info';
	if (params.question)	this.type = 'question';
	if (params.warning)		this.type = 'warning';
	// entry
	if (params.entry)		this.type = 'entry';
	
	this.title =			params.title || false;
	this.text =				params.text || false;
	this.entryText =		params.entryText || params['entry-text'] || false;
	this.hideText =			params.hideText || params['hide-text'] || false;
	
	this.launch();
}

launcher.prototype.launch = function()
{
	switch (this.type)
	{
		case 'error':
		case 'info':
		case 'question':
		case 'warning':
			this.assistant.controller.createStageWithCallback
			(
				{
					name:			this.stageName,
					height:			this.launchHeight(),
					lightweight:	true
				},
				this.launchPopup.bind(this),
				'popupalert'
			);
			break;
			
		case 'entry':
			this.assistant.controller.createStageWithCallback
			(
				{
					name:			this.stageName,
					lightweight:	true
				},
				this.launchCard.bind(this)
			);
			break;
	}
}
launcher.prototype.launchHeight = function()
{
	return 240;
}
launcher.prototype.launchPopup = function(c) {c.pushScene({name: "popup"}, this); }
launcher.prototype.launchCard = function(c) { c.pushScene({name: "card"}, this); }


launcher.prototype.respond = function()
{
	this.responded = true;
}

launcher.num = 0;

launcher.func = function()
{
}