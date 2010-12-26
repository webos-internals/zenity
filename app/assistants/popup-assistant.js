function PopupAssistant(l)
{
	this.launcher = l;
}

PopupAssistant.prototype.setup = function()
{
	this.iconElement =			this.controller.get('icon');
	this.titleElement =			this.controller.get('title');
	this.textElement =			this.controller.get('text');
	
	this.okButtonElement =		this.controller.get('ok-button');
	this.cancelButtonElement =	this.controller.get('cancel-button');
	
	this.okButtonEvent =		this.okButton.bind(this);
	this.cancelButtonEvent =	this.cancelButton.bind(this);
	
	this.iconClass =			'';
	this.title =				'';
	this.showOkButton =			true;
	this.showCancelButton =		false;
	
	switch (this.launcher.type)
	{
		case 'error':
			this.iconClass =		'error';
			this.title =			'Error';
			break;
		
		case 'info':
			this.iconClass =		'info';
			this.title =			'Information';
			break;
		
		case 'question':
			this.iconClass =		'question';
			this.title =			'Question';
			this.showCancelButton =	true;
			break;
		
		case 'warning':
			this.iconClass =		'warning';
			this.title =			'Warning';
			this.showCancelButton =	true;
			break;
	}
	if (this.launcher.title)
	{
		this.title =			this.launcher.title;
	}
	this.titleElement.update(this.title);
	
	if (this.iconClass)
	{
		this.iconElement.addClassName(this.iconClass);
	}
	if (this.launcher.text)
	{
		this.textElement.update(this.launcher.text);
	}
	
	if (this.showOkButton) 
	{
		this.controller.setupWidget('ok-button', {}, {buttonLabel: 'Ok', buttonClass: 'affirmative'});
		this.controller.listen(this.okButtonElement, Mojo.Event.tap, this.okButtonEvent);
	}
	if (this.showCancelButton) 
	{
		this.controller.setupWidget('cancel-button', {}, {buttonLabel: 'Cancel', buttonClass: 'negative'});
		this.controller.listen(this.cancelButtonElement, Mojo.Event.tap, this.cancelButtonEvent);
	}
	
}

PopupAssistant.prototype.okButton = function()
{
	Mojo.Log.error('Popup [Ok Button]');
	this.launcher.respond();
	this.controller.window.close();
}
PopupAssistant.prototype.cancelButton = function()
{
	Mojo.Log.error('Popup [Cancel Button]');
	this.launcher.respond();
	this.controller.window.close();
}

PopupAssistant.prototype.activate = function(event) {}
PopupAssistant.prototype.deactivate = function(event) {}
PopupAssistant.prototype.cleanup = function(event)
{
	if (!this.launcher.responded)
	{
		Mojo.Log.error('Popup [No Button]');
		this.launcher.respond();
	}
	
	if (this.showOkButton) 
	{
		this.controller.stopListening(this.okButtonElement, Mojo.Event.tap, this.okButtonEvent);
	}
	if (this.showCancelButton) 
	{
		this.controller.stopListening(this.cancelButtonElement, Mojo.Event.tap, this.cancelButtonEvent);
	}
}
