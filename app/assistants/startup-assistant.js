function StartupAssistant(changelog)
{
	this.justChangelog = changelog;
	
    this.message = $L('Zenity allows command line scripts to ask the user for input through webOS.');
    this.messages =
	[
		{ version: '0.0.1', log: [ 'Initial Release!' ] }
	];
};

StartupAssistant.prototype.setup = function()
{
    this.titleContainer = this.controller.get('title');
    this.dataContainer =  this.controller.get('data');
	
    var html = '';
	
	if (this.justChangelog)
	{
		this.titleContainer.innerHTML = "Changelog";
	}
	else
	{
		this.titleContainer.innerHTML = Mojo.appInfo.title;
		html += '<div class="text">' + this.message + '</div>';
	}
	
	for (var m = 0; m < this.messages.length; m++) 
	{
	    html += Mojo.View.render({object: {title: 'v' + this.messages[m].version}, template: 'startup/changeLog'});
	    html += '<ul>';
	    for (var l = 0; l < this.messages[m].log.length; l++)
		{
			html += '<li>' + this.messages[m].log[l] + '</li>';
	    }
	    html += '</ul>';
	}
	
	this.dataContainer.innerHTML = html;
	
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems: true}, {visible: false});
};

StartupAssistant.prototype.handleCommand = function(event)
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

// Local Variables:
// tab-width: 4
// End:
