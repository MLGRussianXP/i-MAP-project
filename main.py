import eel
from pyautogui import size

eel.init('web')

eel.start("main.html", mode="chrome", size=size(), fullscreen=True)
