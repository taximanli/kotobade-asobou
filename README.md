word that updates as you type within the active row
once entered, you want to store the whole word in an array full of all the guesses so far. 
["treat", "races", "", "", "", "" ] 
currentRow = 0 and increments
once you guess a word, the status of the letters is stored. That updates the appearance of the keyboard, and also the color of the cell in the word row.
after you guess a word, the next row is "unlocked" or the active row that you are now working in. You can input letters starting at the furthest left, as the row is filled, the "active" cell moves one to the right. 
If you delete a letter, the cell to the left is emptied and becomes the current cell. 
If you hit enter before all cells are filled, it errors out
If you guess a word that isn't in the words list, it errors out. 

