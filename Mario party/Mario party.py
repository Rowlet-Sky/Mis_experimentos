import random
import time
import os

class JuegoMarioParty:
    def __init__(self, num_jugadores):
        self.jugadores = {}
        self.posiciones = {}
        self.monedas = {}
        self.estrellas = {}
        self.items = {}
        self.tablero_length = 25  # Tablero más grande
        self.turnos_powerup = {}
        
        # Inicializar jugadores
        personajes = ['👨 Mario', '👨 Luigi', '🍄 Toad', '👸 Peach']
        print("\nPersonajes disponibles:")
        for i, personaje in enumerate(personajes):
            print(f"{i+1}. {personaje}")
            
        for i in range(num_jugadores):
            while True:
                try:
                    seleccion = int(input(f"\nJugador {i+1}, elige tu personaje (1-{len(personajes)}): ")) - 1
                    if 0 <= seleccion < len(personajes):
                        nombre = personajes.pop(seleccion)
                        break
                    print("Selección inválida.")
                except ValueError:
                    print("Por favor ingresa un número válido.")
                    
            self.jugadores[i] = nombre
            self.posiciones[nombre] = 0
            self.monedas[nombre] = 20
            self.estrellas[nombre] = 0
            self.items[nombre] = []
            self.turnos_powerup[nombre] = 0
        
        # Crear tablero con más eventos
        self.tablero = ['🎲'] * self.tablero_length
        eventos = ['⭐', '💰', '❌', '🎁', '🏪', '⚡', '🎯', '🎪']
        for _ in range(12):  # Más eventos en el tablero
            pos = random.randint(0, self.tablero_length-1)
            self.tablero[pos] = random.choice(eventos)
            
        self.tienda_items = {
            '🎭 Máscara de cambio': 15,
            '🎲 Dado doble': 10,
            '🛡️ Escudo': 8,
            '🧲 Imán de monedas': 12,
            '⚡ Power-up': 20
        }
    
    def limpiar_pantalla(self):
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def lanzar_dado(self, jugador):
        if '🎲 Dado doble' in self.items[jugador]:
            self.items[jugador].remove('🎲 Dado doble')
            print(f"{jugador} usó el Dado doble! 🎲")
            return random.randint(1, 6) * 2
        return random.randint(1, 6)
    
    def mostrar_tablero(self, jugador_actual=None):
        tablero_vista = self.tablero.copy()
        for jugador, pos in self.posiciones.items():
            if pos < len(tablero_vista):
                if jugador == jugador_actual:
                    tablero_vista[pos] = '👉'
                else:
                    tablero_vista[pos] = '👤'
        print("\nTablero actual:")
        print(" ".join(tablero_vista))
        
    def mostrar_estado(self):
        print("\nEstado actual del juego:")
        for jugador in self.jugadores.values():
            print(f"{jugador}: {self.monedas[jugador]} monedas, {self.estrellas[jugador]} estrellas")

    def tienda(self, jugador):
        print("\n🏪 Bienvenido a la tienda!")
        print("\nItems disponibles:")
        for item, precio in self.tienda_items.items():
            print(f"{item}: {precio} monedas")
        
        while True:
            comprar = input("\n¿Quieres comprar algo? (s/n): ").lower()
            if comprar == 'n':
                break
            elif comprar == 's':
                print("\nItems disponibles:")
                for i, (item, precio) in enumerate(self.tienda_items.items(), 1):
                    print(f"{i}. {item}: {precio} monedas")
                
                try:
                    seleccion = int(input("Elige un item (número) o 0 para salir: ")) - 1
                    if seleccion == -1:
                        break
                    
                    item = list(self.tienda_items.keys())[seleccion]
                    precio = self.tienda_items[item]
                    
                    if self.monedas[jugador] >= precio:
                        self.monedas[jugador] -= precio
                        self.items[jugador].append(item)
                        print(f"\n¡Compraste {item}! 🛍️")
                    else:
                        print("\nNo tienes suficientes monedas 😢")
                except (ValueError, IndexError):
                    print("Selección inválida")
    
    def minijuego(self, jugador):
        minijuegos = [
            self.minijuego_numero,
            self.minijuego_piedra_papel_tijera,
            self.minijuego_memoria,
            self.minijuego_trivia
        ]
        minijuego_elegido = random.choice(minijuegos)
        minijuego_elegido(jugador)
    
    def minijuego_numero(self, jugador):
        print(f"\n🎮 ¡Minijuego: Adivina el número! ({jugador})")
        print("Adivina el número (1-5):")
        numero_secreto = random.randint(1, 5)
        intento = int(input("Tu respuesta: "))
        
        if intento == numero_secreto:
            premio = random.randint(5, 15)
            self.monedas[jugador] += premio
            print(f"¡Correcto! Ganaste {premio} monedas 🎉")
        else:
            print(f"Incorrecto. El número era {numero_secreto} 😢")
    
    def minijuego_piedra_papel_tijera(self, jugador):
        print(f"\n🎮 ¡Minijuego: Piedra, Papel o Tijera! ({jugador})")
        opciones = ['piedra', 'papel', 'tijera']
        print("\nElige: piedra, papel o tijera")
        eleccion_jugador = input().lower()
        eleccion_cpu = random.choice(opciones)
        
        print(f"\nCPU eligió: {eleccion_cpu}")
        
        if eleccion_jugador == eleccion_cpu:
            print("¡Empate! Ganas 5 monedas")
            self.monedas[jugador] += 5
        elif ((eleccion_jugador == 'piedra' and eleccion_cpu == 'tijera') or
              (eleccion_jugador == 'papel' and eleccion_cpu == 'piedra') or
              (eleccion_jugador == 'tijera' and eleccion_cpu == 'papel')):
            print("¡Ganaste! Recibes 10 monedas")
            self.monedas[jugador] += 10
        else:
            print("Perdiste... No ganas monedas")
    
    def minijuego_memoria(self, jugador):
        print(f"\n🎮 ¡Minijuego: Memoria! ({jugador})")
        secuencia = [random.randint(1, 4) for _ in range(4)]
        print("\nMemoriza la secuencia:")
        for num in secuencia:
            print(num, end=' ')
            time.sleep(1)
        
        self.limpiar_pantalla()
        print("\nIngresa la secuencia (números separados por espacios):")
        intento = input().split()
        
        try:
            intento = [int(x) for x in intento]
            if intento == secuencia:
                premio = 15
                self.monedas[jugador] += premio
                print(f"¡Correcto! Ganaste {premio} monedas 🎉")
            else:
                print("Secuencia incorrecta 😢")
        except ValueError:
            print("Entrada inválida")
    
    def minijuego_trivia(self, jugador):
        print(f"\n🎮 ¡Minijuego: Trivia de Mario! ({jugador})")
        preguntas = [
            ("¿Cuál es el nombre del hermano de Mario?", "luigi"),
            ("¿De qué color es Yoshi?", "verde"),
            ("¿Cómo se llama la princesa que Mario debe rescatar?", "peach"),
            ("¿Qué poder da la estrella en Mario Bros?", "invencibilidad")
        ]
        pregunta, respuesta = random.choice(preguntas)
        print(f"\n{pregunta}")
        respuesta_jugador = input("Respuesta: ").lower()
        
        if respuesta_jugador == respuesta:
            premio = random.randint(10, 20)
            self.monedas[jugador] += premio
            print(f"¡Correcto! Ganaste {premio} monedas 🎉")
        else:
            print(f"Incorrecto. La respuesta era: {respuesta}")
    
    def procesar_evento(self, jugador, posicion):
        evento = self.tablero[posicion]
        if evento == '⭐':
            if self.monedas[jugador] >= 20:
                comprar = input("¿Quieres comprar una estrella por 20 monedas? (s/n): ").lower()
                if comprar == 's':
                    self.monedas[jugador] -= 20
                    self.estrellas[jugador] += 1
                    print(f"¡{jugador} compró una estrella! ⭐")
            else:
                print(f"{jugador} no tiene suficientes monedas para comprar una estrella")
        
        elif evento == '💰':
            bonus = 2 if self.turnos_powerup[jugador] > 0 else 1
            monedas_ganadas = random.randint(5, 15) * bonus
            self.monedas[jugador] += monedas_ganadas
            print(f"¡{jugador} ganó {monedas_ganadas} monedas! 💰")
        
        elif evento == '❌':
            if '🛡️ Escudo' in self.items[jugador]:
                self.items[jugador].remove('🛡️ Escudo')
                print(f"{jugador} usó el Escudo y evitó perder monedas! 🛡️")
            else:
                monedas_perdidas = random.randint(3, 8)
                self.monedas[jugador] = max(0, self.monedas[jugador] - monedas_perdidas)
                print(f"¡{jugador} perdió {monedas_perdidas} monedas! ❌")
        
        elif evento == '🎁':
            eventos_especiales = [
                'doble_monedas',
                'robar',
                'intercambiar',
                'bonus_estrella',
                'teletransporte'
            ]
            evento_especial = random.choice(eventos_especiales)
            
            if evento_especial == 'doble_monedas':
                self.monedas[jugador] *= 2
                print(f"¡{jugador} duplicó sus monedas! 🎁")
            
            elif evento_especial == 'robar':
                if '🧲 Imán de monedas' in self.items[jugador]:
                    self.items[jugador].remove('🧲 Imán de monedas')
                    victima = random.choice([j for j in self.jugadores.values() if j != jugador])
                    monedas_robadas = min(10, self.monedas[victima])
                    self.monedas[victima] -= monedas_robadas
                    self.monedas[jugador] += monedas_robadas
                    print(f"¡{jugador} usó el Imán de monedas y robó {monedas_robadas} monedas a {victima}! 🧲")
                else:
                    victima = random.choice([j for j in self.jugadores.values() if j != jugador])
                    monedas_robadas = min(5, self.monedas[victima])
                    self.monedas[victima] -= monedas_robadas
                    self.monedas[jugador] += monedas_robadas
                    print(f"¡{jugador} robó {monedas_robadas} monedas a {victima}! 🎭")
            
            elif evento_especial == 'intercambiar':
                if '🎭 Máscara de cambio' in self.items[jugador]:
                    self.items[jugador].remove('🎭 Máscara de cambio')
                    victima = random.choice([j for j in self.jugadores.values() if j != jugador])
                    self.monedas[jugador], self.monedas[victima] = self.monedas[victima], self.monedas[jugador]
                    self.estrellas[jugador], self.estrellas[victima] = self.estrellas[victima], self.estrellas[jugador]
                    print(f"¡{jugador} usó la Máscara de cambio y intercambió monedas Y estrellas con {victima}! 🎭")
                else:
                    victima = random.choice([j for j in self.jugadores.values() if j != jugador])
                    self.monedas[jugador], self.monedas[victima] = self.monedas[victima], self.monedas[jugador]
                    print(f"¡{jugador} intercambió monedas con {victima}! 🔄")
            
            elif evento_especial == 'bonus_estrella':
                if random.random() < 0.3:  # 30% de probabilidad
                    self.estrellas[jugador] += 1
                    print(f"¡{jugador} encontró una estrella bonus! ⭐")
            
            elif evento_especial == 'teletransporte':
                nueva_pos = random.randint(0, self.tablero_length-1)
                self.posiciones[jugador] = nueva_pos
                print(f"¡{jugador} se teletransportó a una nueva posición! 🌟")
        
        elif evento == '🏪':
            self.tienda(jugador)
        
        elif evento == '⚡':
            if '⚡ Power-up' in self.items[jugador]:
                self.items[jugador].remove('⚡ Power-up')
                self.turnos_powerup[jugador] = 3
                print(f"¡{jugador} activó el Power-up por 3 turnos! ⚡")
            else:
                self.turnos_powerup[jugador] = 2
                print(f"¡{jugador} obtuvo un Power-up por 2 turnos! ⚡")
        
        elif evento == '🎯':
            monedas_objetivo = random.randint(10, 30)
            print(f"\n🎯 ¡Desafío de monedas! Objetivo: {monedas_objetivo}")
            if self.monedas[jugador] >= monedas_objetivo:
                self.estrellas[jugador] += 1
                print(f"¡{jugador} completó el desafío y ganó una estrella! ⭐")
            else:
                print(f"{jugador} no completó el desafío")

    def jugar(self, turnos):
        for turno in range(turnos):
            print(f"\n=== Turno {turno + 1} ===")
            
            # Actualizar power-ups
            for jugador in self.jugadores.values():
                if self.turnos_powerup[jugador] > 0:
                    self.turnos_powerup[jugador] -= 1
                    if self.turnos_powerup[jugador] == 0:
                        print(f"\n{jugador} perdió su power-up ⚡")
            
            for jugador_id, jugador in self.jugadores.items():
                input(f"\nPresiona Enter para el turno de {jugador}...")
                
                # Mostrar items disponibles
                if self.items[jugador]:
                    print(f"\nItems de {jugador}: {', '.join(self.items[jugador])}")
                
                # Lanzar dado
                dado = self.lanzar_dado(jugador)
                print(f"{jugador} lanzó un {dado} 🎲")
                
                # Mover jugador
                nueva_pos = (self.posiciones[jugador] + dado) % self.tablero_length
                self.posiciones[jugador] = nueva_pos
                
                # Mostrar tablero
                self.mostrar_tablero(jugador)
                
                # Procesar evento
                self.procesar_evento(jugador, nueva_pos)
                
                # Minijuego
                if random.random() < 0.3:  # 30% de probabilidad de minijuego
                    self.minijuego(jugador)
                
                # Mostrar estado
                self.mostrar_estado()
                time.sleep(1)
        
        # Determinar ganador
        ganador = max(self.jugadores.values(), 
                     key=lambda j: (self.estrellas[j] * 100 + self.monedas[j]))
        
        print("\n🎮 ¡Fin del juego! 🎮")
        print("\nPuntuaciones finales:")
        for jugador in self.jugadores.values():
            print(f"{jugador}: {self.estrellas[jugador]} estrellas y {self.monedas[jugador]} monedas")
        
        print(f"\n🏆 ¡{ganador} es el ganador con {self.estrellas[ganador]} estrellas y {self.monedas[ganador]} monedas!")

if __name__ == "__main__":
    print("¡Bienvenido a Mario Party! 🎮")
    while True:
        try:
            num_jugadores = int(input("Número de jugadores (2-4): "))
            if 2 <= num_jugadores <= 4:
                break
            print("El número de jugadores debe estar entre 2 y 4.")
        except ValueError:
            print("Por favor ingresa un número válido.")
    
    while True:
        try:
            num_turnos = int(input("Número de turnos a jugar: "))
            if num_turnos > 0:
                break
            print("El número de turnos debe ser mayor a 0.")
        except ValueError:
            print("Por favor ingresa un número válido.")
    
    juego = JuegoMarioParty(num_jugadores)
    juego.jugar(num_turnos)