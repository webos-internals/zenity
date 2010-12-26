function CardAssistant(l)
{
	this.launcher = l;
	
    this.menuModel =
	{
	    visible: true,
	    items:
	    [
			Mojo.Menu.editItem,
			{
				label: "Help",
				command: 'do-help'
			}
	     ]
	};
}

CardAssistant.prototype.setup = function()
{
	this.iconElement =				this.controller.get('icon');
	this.titleElement =				this.controller.get('title');
	this.textElement =				this.controller.get('text');
	
	this.okButtonElement =			this.controller.get('ok-button');
	this.cancelButtonElement =		this.controller.get('cancel-button');
	this.textFieldElement = 		this.controller.get('textField');
	this.passwordFieldElement = 	this.controller.get('passwordField');
	
	this.okButtonEvent =			this.okButton.bind(this);
	this.cancelButtonEvent =		this.cancelButton.bind(this);
	
	this.iconClass =				'';
	this.title =					'';
	this.showOkButton =				true;
	this.showCancelButton =			true;
	
	if (this.launcher.type == 'entry')
	{
		if (this.launcher.hideText)
		{
			this.controller.setupWidget
			(
				'passwordField',
				{
					multiline: false,
					enterSubmits: false,
					changeOnKeyPress: true,
					hintText: '',
					modelProperty: 'value',
					maxLength: 128,
					textCase: Mojo.Widget.steModeLowerCase,
					focusMode: Mojo.Widget.focusSelectMode
				},
				{
					value: this.launcher.entryText
				}
			);
		}
		else
		{
			this.controller.setupWidget
			(
				'textField',
				{
					multiline: false,
					enterSubmits: false,
					changeOnKeyPress: true,
					hintText: '',
					modelProperty: 'value',
					maxLength: 128,
					textCase: Mojo.Widget.steModeLowerCase,
					focusMode: Mojo.Widget.focusSelectMode
				},
				{
					value: this.launcher.entryText
				}
			);
		}
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
	
	
    this.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: true }, this.menuModel);
}

CardAssistant.prototype.getValue = function()
{
	if (this.launcher.type == 'entry')
	{
		if (this.launcher.hideText)
		{
			return this.passwordFieldElement.mojo.getValue();
		}
		else
		{
			return this.textFieldElement.mojo.getValue();
		}
	}
	return false;
}

CardAssistant.prototype.okButton = function()
{
	Mojo.Log.error('Popup [Ok Button] (' + this.getValue() + ')');
	this.launcher.respond();
	this.controller.window.close();
}
CardAssistant.prototype.cancelButton = function()
{
	Mojo.Log.error('Popup [Cancel Button] (' + this.getValue() + ')');
	this.launcher.respond();
	this.controller.window.close();
}

CardAssistant.prototype.activate = function(event) {}
CardAssistant.prototype.deactivate = function(event) {}
CardAssistant.prototype.cleanup = function(event)
{
	if (!this.launcher.responded)
	{
		Mojo.Log.error('Popup [No Button] (' + this.getValue() + ')');
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

CardAssistant.prototype.handleCommand = function(event)
{
    if (event.type == Mojo.Event.command)
	{
	    switch (event.command)
		{	
			case 'do-help':
				this.controller.stageController.pushScene('help');
				break;		
		}
	}
};