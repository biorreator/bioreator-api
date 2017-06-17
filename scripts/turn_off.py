#!/usr/bin/python

#Definindo a biblioteca GPIO
import RPi.GPIO as GPIO
import sys

#Definindo a biblioteca TIME
import time
#Aqui definimos que vamos usar o numero de ordem de Porta, e nao o numero que refere a BOARD.
# Para alterar troque GPIO.BCM para GPIO.BOARD
GPIO.setmode(GPIO.BCM)

# Aqui vamos desativar msg de log no shell (ex. >>> RuntimeWarning: This channel is already in use, continuing anyway.
GPIO.setwarnings(False)
# Para ativar novamente apenas comente linha de cima.

# Aqui criamos um Array com as portas GPIO que seram utilizadas.
pinList = [sys.argv[1]]

# Criamos um laco com as portas listadas em pinList (ex. 2,3,4,7...) e setamos o valor como OUT (False/0)
for i in pinList:
    GPIO.setup(int(sys.argv[1]), GPIO.OUT)

# Criando o loop para testar a GPIO caso de FALSE imprime no shell OFF
try:
  GPIO.output(int(sys.argv[1]), GPIO.LOW)
  print "OFF"

# Para sair/cancelar (crtl + c) e imprime Sair
except KeyboardInterrupt:
  print "  Sair"

# Reseta/Limpa configuracao da GPIO
  GPIO.cleanup()
