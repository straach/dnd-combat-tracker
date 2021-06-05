# DnD Combat Tracker

My version of a combat tracker for a dungeon master. Uses the API from http://www.dnd5eapi.co/ 
and saves data in your browsers local storage, to be able to play spanning multiple sessions.

Features:

* Keep it simple and stupid. It does what it says.
* Automatically sorts your combatants in iniciative order
* Allows adding multiple monsters of same race at a time
* The layout is focused on arranging the order of combat
* It shows monster stats on hover only on hover
    * Avoid hungry player eyes seeing more than they should
* Has an "obscure" function of the monsters health for the same reason.
    * When obscure is on, the health is revealed on hovering
* Tracks rounds and time passed in an encounter
* It does not show or track players health. We play by trust
* But we can log players and monsters conditions
    * Multiple can apply
* Keeps track of your session even if the browser closes
    * Just come back on your next session
* Saves all your players and basic stats, so you can pick and choose the players for each encounter


Happy game!

# For developers:

* You need node.js and an editor
* Install packages with `npm install`then run with `npm start`
* Happy modding


# Credits:
* http://www.dnd5eapi.co/ for the data
* https://react-icons.github.io/react-icons/search?q=aid for the icons
* https://codepen.io/retractedhack/pen/gPLpWe for the layout of the statsblock
* https://usehooks.com/useLocalStorage/ for the localStorage hook
