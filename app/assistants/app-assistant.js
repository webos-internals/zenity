var startupStageName = 'zenity-startup';

function AppAssistant(){}

AppAssistant.prototype.handleLaunch = function(params)
{
	try
	{
		if (params)
		{
			var l = new launcher(this, params);
		}
		else
		{
	        if (this.controller.getStageController(startupStageName))
			{
				startupStageController.activate();
			}
			else
			{
				this.controller.createStageWithCallback({name: startupStageName, lightweight: true}, function(c){c.pushScene('startup')});
			}
		}
	}
	catch (e)
	{
		Mojo.Log.logException(e, "AppAssistant#handleLaunch");
	}
}

AppAssistant.prototype.cleanup = function(){}
