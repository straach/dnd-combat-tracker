# DnD Combat Tracker

> Functional [demo](http://dnd.achim-strauss.net/) now available. You can play it right from there.

My version of a combat tracker for a dungeon master. Uses the API from [dnd5eapi.co](http://www.dnd5eapi.co/) 
and saves data in your browsers local storage, to be able to play spanning multiple sessions.

Features:

* Keep it simple and stupid. It does what it says.
* Automatically sorts your combatants in iniciative order
* Allows adding multiple monsters of same race at a time
* The layout is focused on arranging the order of combat
* Has an "obscure" function to hide monster's health and stats from accidentally glancing over it
    * When obscure is on, the health is revealed on hovering
* Monster stats are available on hovering at any moment
* Tracks rounds and time passed in an encounter
* It does not show or track players health. We play with trust
* But we can log players and monsters conditions
    * Multiple can apply
* Keeps track of your session even if the browser closes
    * Just come back on your next session
* Saves all your players and basic stats
    * You dont have to enter it every time
    * You can pick and choose the players separately for each encounter (y u not here again, Josh?)



Happy game!


## For developers:

* You need node.js and an editor
* Install packages with `npm install`then run with `npm start`
* Happy modding

## TODOs:
* Monster stats on-hover are having a bad layout. To be improved!


## Credits:
* http://www.dnd5eapi.co/ for the data
* https://react-icons.github.io/react-icons/search?q=aid for the icons
* https://codepen.io/retractedhack/pen/gPLpWe for the layout of the statsblock
* https://usehooks.com/useLocalStorage/ for the localStorage hook
* https://github.com/simonwhitaker/github-fork-ribbon-css Github fork ribbon
