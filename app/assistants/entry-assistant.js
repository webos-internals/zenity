function EntryAssistant(options)
{
	this.options = options;
}

EntryAssistant.prototype.setup = function()
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
	
	
	this.controller.setupWidget
	(
		'textField',
		{
			multiline: false,
			enterSubmits: false,
			//changeOnKeyPress: true,
			hintText: '',
			modelProperty: 'value',
			maxLength: 128,
			textCase: Mojo.Widget.steModeLowerCase,
			focusMode: Mojo.Widget.focusSelectMode
		},
		{
			value: ''
		}
	);
	
	
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
	
	/*
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
	*/
}

EntryAssistant.prototype.okButton = function()
{
	alert('Popup [Ok Button]');
	
	this.controller.window.close();
}
EntryAssistant.prototype.cancelButton = function()
{
	alert('Popup [Cancel Button]');
	
	this.controller.window.close();
}

EntryAssistant.prototype.activate = function(event) {}
EntryAssistant.prototype.deactivate = function(event) {}
EntryAssistant.prototype.cleanup = function(event)
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
