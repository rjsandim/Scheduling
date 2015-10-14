# Scheduling
###Trabalho de Sistemas operacionais
---

Os alunos devem implementar o algoritmo Round Robin. Na imagem abaixo temos um exemplo do funcionamento deste algoritmo.

![RoundRobin Algoritmo](https://upload.wikimedia.org/wikipedia/commons/b/bd/Round_Robin2.gif)

O algoritmo Round Robin é basicamente o algoritmo de fila, porém há uma variação. A variação é que no algoritmo fila o processo deve ser escalonado para o próximo processo da fila após a finalização da execução, e no algoritmo Round Robin, o próximo processo deve ser escalonado a cada intervalo de tempo, denominado QUANTUM. O quantum é uma valor inteiro definido em segundos.


O algoritmo funciona da seguinte maneira:

1. Dada uma fila de processos P, onde cada processo é Pi; 
2. Execute o processo Pi durante um Quantum;
3. Após a execução, escalone para o **próximo processo**, volte para o passo 2;


##Observaçōes:

1. O **próximo processo** deve ser o sucessor que ainda possui algo para executar. Caso o processo seja o último da fila, então devemos buscar processos do início da fila, novamente. Ou seja, temos uma fila circular. Esse algoritmo executa, até acabarem os processos em execução.


2. Se o processo tem 500 ciclos para terminar, porém o processador executa 1000 ciclos por segundo e nosso quantum é de 2 segundos. Teríamos que nosso processo finalizaria na metade do primeiro segundo. No algoritmo original o processo deveria ser escalonado para o próximo, porém, a fim de facilitar a implementação, o processador ficará sem executar nenhum processo até terminar a duração do quantum, momento obrigatório para o escalonamento.

3. O Aluno deverá personalizar o CSS a fim de criar mostrar do melhor modo possível a execução dos algoritmos. 

4. O algoritmo implementado valerá 4 pontos no trabalho e o CSS 6 pontos.

5. Quaisquer dúvidas devem ser enviadas via email (rjsandim@gmail.com) ou WhatsApp.

