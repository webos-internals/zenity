function AppAssistant() {}

AppAssistant.prototype.handleLaunch = function(launchParams)
{
	try
	{
		// for testing
		/*var launchParams =
		{
			error: true,
			title: 'Error',
			text: 'There was a problem, and this is the error that we threw at you so you would know that there was an error.',
			height: 155
		};*/
        /*var launchParams =
		{
			info: true,
			title: 'Information Message',
			text: 'This is some information zenity wants you to read!',
			height: 135
		};*/
        var launchParams =
		{
			question: true,
			title: 'Question Test Message?',
			text: 'This is what the question message will look like.',
			height: 135
		};
        /*var launchParams =
		{
			warning: true,
			title: 'Warning!!!',
			text: 'READ THIS!',
			height: 125
		};*/
		/*var launchParams =
		{
			entry: true,
			title: 'Entry',
			text: 'Enter Text:',
			'entry-text': '',
			height: 160
		};*/
		
		var options = false;
		if (Object.isString(launchParams)) 
		{
			if (launchParams.isJSON())
			{
				options = launchParams.evalJSON();
			}
		}
		else 
		{
			options = launchParams;
		}
		
		if (options)
		{
			if (options.calendar)
			{
				alert('CALENDAR');
				return;
			}
			else if (options.error || options.info || options.question || options.warning)
			{
				var stageName = "message-" + Date.now();
				Mojo.Controller.getAppController().createStageWithCallback
				(
					{
						name: stageName,
						height: (options.height?options.height:240),
						lightweight: true
					},
					function(stageController)
					{
				        stageController.pushScene({name: "message", sceneTemplate: "message/message-scene"}, options);
					},
					'popupalert'
				);
				return;
			}
			else if (options.entry)
			{
				var stageName = "entry-" + Date.now();
				Mojo.Controller.getAppController().createStageWithCallback
				(
					{
						name: stageName,
						height: (options.height?options.height:240),
						lightweight: true
					},
					function(stageController)
					{
				        stageController.pushScene({name: "entry", sceneTemplate: "entry/entry-scene"}, options);
					}
				);
				return;
			}
		}
		
		// no type fits :/
		var stageName = "manualLaunch-" + Date.now();
		Mojo.Controller.getAppController().createStageWithCallback
		(
			{
				name: stageName,
				height: 240,
				lightweight: true
			},
			function(stageController)
			{
		        stageController.pushScene({name: "manualOpen", sceneTemplate: "manual-open/manual-open-scene"}, options);
			},
			'popupalert'
		);
		return;
	}
	catch (e)
	{
		Mojo.Log.logException(e, "AppAssistant#handleLaunch");
	}
}

AppAssistant.prototype.cleanup = function() {}
