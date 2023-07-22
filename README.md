# Foundry VTT - DSA5 Dice Roller by xerber

The module adds FoundryVTT functions to simple dice roll, adapted for the game Das schwarze Auge / The Dark Eye.

After installation a new button is added to the left bar. When activated a popup will be displayed.

![demo_popup](https://github.com/xerberde/xerbers-dsa5-roller/blob/main/images/demo_popup.png)


From here you can roll a LeP, AsP, KaP, 1D6, 2D6, 3D6 as well 1D20 with or without bonus points.


![demo_roll](https://github.com/xerberde/xerbers-dsa5-roller/blob/main/images/demo_roll.png)

### How to use

* Mouse left click on &plusmn; in the popup performs a throw with positive bonus.
* Mouse right click on &plusmn; in the popup performs a roll with negative bonus.

### Settings

* Enable/Disable each dice row in settings dialog to show or not show in popup
* Change LeP regeneration dice roll form 1D6 to 1D3
* Change number of rows with displayed bonus from 1-10

![demo_settings](https://github.com/xerberde/xerbers-dsa5-roller/blob/main/images/demo_settings.png)

### Installation Instructions

To install a module, follow these instructions:

1. Start Foundry VTT and browse to the Game Modules tab in the Configuration and Setup menu
2. Select the Install Module button and enter the following [module.json](https://raw.githubusercontent.com/xerberde/xerbers-dsa5-roller/main/module.json)
3. Click Install and wait for installation to complete 

### Release Notes
* 1.0.0
	* First Release
* 1.0.1
	* New Feature - Settings menu
	* New Feature - German and english translation
* 1.0.2
	* Patch - Issues with Setting Menu name
	* Patch - Popup Windows moved to avoid overlap with scenes on top
	* New Feature - Leftclick and Rightclick integration for negative/positive bonus on roll
* 1.0.3
	* Patch - Translation for german and english corrected
	* New Feature - Karmaenergy added as dice line

### Feedback

If you have any suggestions or feedback, please contact me on Discord [xerberde](https://discordapp.com/users/xerberde).


### Credits
Thanks to [jopeek](https://github.com/jopeek/fvtt-simple-dice-roller/) for providing ideas and base code.

