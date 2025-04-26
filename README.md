Proyecto de Codificación Huffman
Este es un proyecto en React que implementa el algoritmo de codificación Huffman. Permite a los usuarios ingresar símbolos con sus probabilidades, construir un árbol de Huffman, y calcular métricas como la entropía, longitud promedio y eficiencia.
Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

Node.js (versión 14 o superior): Puedes descargarlo desde https://nodejs.org/.
npm (viene con Node.js) o yarn (opcional).

Instrucciones de Instalación y Ejecución
Sigue estos pasos para ejecutar el proyecto en tu máquina:

Clona o Descarga el Proyecto

Si estás usando Git, clona el repositorio:git clone <URL_DEL_REPOSITORIO>


Si descargaste el proyecto como un archivo ZIP, descomprímelo.


Navega al Directorio del Proyecto
cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>


Instala las DependenciasEjecuta el siguiente comando para instalar todas las dependencias listadas en package.json:
npm install

Esto instalará React, Tailwind CSS, Vis.js y otras dependencias necesarias.

Inicia la AplicaciónUna vez instaladas las dependencias, inicia el servidor de desarrollo con:
npm start

Esto abrirá automáticamente la aplicación en tu navegador en http://localhost:3000.


Uso

En la pantalla inicial, ingresa el número de símbolos (entre 2 y 16) y haz clic en "Continuar".
Ingresa las probabilidades para cada símbolo (la suma debe ser 1).
Haz clic en "Calcular" para generar el árbol de Huffman, los códigos, y las métricas (entropía, longitud promedio, eficiencia).

Estructura del Proyecto

src/: Contiene los archivos fuente de la aplicación.
App.js: Componente principal que maneja el flujo de la aplicación.
components/: Componentes React (SymbolInput.js, HuffmanTree.js, Results.js).
utils/huffman.js: Lógica del algoritmo de Huffman.


public/: Archivos estáticos como index.html.
package.json: Dependencias y scripts del proyecto.
tailwind.config.js: Configuración de Tailwind CSS.

Dependencias Principales

React: Biblioteca para construir la interfaz de usuario.
Vis.js: Usado para visualizar el árbol de Huffman.
Tailwind CSS: Framework de estilos.

Solución de Problemas

Error: "Node.js no está instalado"Asegúrate de tener Node.js instalado. Descárgalo desde https://nodejs.org/.

Error al ejecutar npm installVerifica que tienes una conexión a internet y que npm está correctamente instalado. También puedes intentar:
npm cache clean --force
npm install


El puerto 3000 está ocupadoSi el puerto 3000 ya está en uso, puedes cambiarlo al iniciar la aplicación:
PORT=3001 npm start



Autor

[Tu Nombre]

Si tienes alguna duda o problema, no dudes en contactarme.
