function MessageAssistant(options)
{
	this.options = options;
}

MessageAssistant.prototype.setup = function()
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
	
	if (this.options.error)
	{
		this.iconClass =		'error';
		this.title =			'Error';
	}
	else if (this.options.info)
	{
		this.iconClass =		'info';
		this.title =			'Information';
	}
	else if (this.options.question)
	{
		this.iconClass =		'question';
		this.title =			'Question';
		this.showCancelButton =	true;
	}
	else if (this.options.warning)
	{
		this.iconClass =		'warning';
		this.title =			'Warning';
		this.showCancelButton =	true;
	}
	if (this.options.title)
	{
		this.title =			this.options.title;
	}
	
	this.titleElement.update(this.title);
	if (this.iconClass)
	{
		this.iconElement.addClassName(this.iconClass);
	}
	if (this.options.text)
	{
		this.textElement.update(this.options.text);
	}
	
	if (this.showOkButton) 
	{
		this.controller.setupWidget('ok-button', {}, {buttonLabel: 'Ok', buttonClass: 'affirmative'});
	    Mojo.Event.listen(this.okButtonElement, Mojo.Event.tap, this.okButtonEvent);
	}
	if (this.showCancelButton) 
	{
		this.controller.setupWidget('cancel-button', {}, {buttonLabel: 'Cancel', buttonClass: 'negative'});
	    Mojo.Event.listen(this.cancelButtonElement, Mojo.Event.tap, this.cancelButtonEvent);
	}
	
}

MessageAssistant.prototype.okButton = function()
{
	alert('Popup [Ok Button]');
	
	this.controller.window.close();
}
MessageAssistant.prototype.cancelButton = function()
{
	alert('Popup [Cancel Button]');
	
	this.controller.window.close();
}

MessageAssistant.prototype.activate = function(event) {}
MessageAssistant.prototype.deactivate = function(event) {}
MessageAssistant.prototype.cleanup = function(event)
{
	if (this.showOkButton) 
	{
		Mojo.Event.stopListening(this.okButtonElement, Mojo.Event.tap, this.okButtonEvent);
	}
	if (this.showCancelButton) 
	{
		Mojo.Event.stopListening(this.cancelButtonElement, Mojo.Event.tap, this.cancelButtonEvent);
	}
}
