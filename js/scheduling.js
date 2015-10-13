$(document).ready(function() {

	var processos = [];
	var config = {};
	var time = 0;

	$("#adicionar-processo").click(function() {

		var Processo = {};
		Processo.nome = $("#nome-processo").val();
		Processo.tamanho = $("#tamanho-processo").val();
		Processo.prioridade = $("#prioridade").val();
		Processo.inicia = $("#inicia-em").val();
		Processo.id = Math.floor((Math.random() * 10000) + 1);
		Processo.index = processos.length; 
	
		if (existeProcesso(Processo)) { 
			processos.push(Processo);
			$("#reset").click();

			atualizarTabelaDeProcessos(Processo);
		}
	});

	var existeProcesso = function(Processo) {
		return Processo.nome.length && Processo.tamanho.length && Processo.inicia.length;
	}


	var atualizarTabelaDeProcessos = function(Processo) {

		var itemTabela = "<tr>";
		itemTabela += "<td>"+ Processo.index +"</td>";
		itemTabela += "<td>"+ Processo.nome +"</td>";
		itemTabela += "<td>"+ Processo.id +"</td>";
		itemTabela += "<td>"+ Processo.tamanho +"</td>";
		itemTabela += "<td>"+ Processo.prioridade +"</td>";
		itemTabela += "<td>"+ Processo.inicia +"</td>";
		itemTabela += "<td><button>Editar</button> <button>Remover</button></td></tr>";

		var nomeDosAlgoritmos = {
			fifo: 'FIFO',
			shortest: 'Menores Primeiro',
			priority: 'Prioridade',
			lottery: 'Loteria',
			roundrobin: 'Round-Robin'
		};

		itemTabela += gerarSubItens(nomeDosAlgoritmos, Processo);

		$("#novo-processo").append(itemTabela);
	}

	var gerarSubItens = function(nomeDosAlgoritmos, p) {
		var subItens = "<tr id=\"processo-"+ p.id +"\"><td colspan='7'><table><thread><th>Algoritmo</th><th>Running</th><th>Tam. Processo</th>";
		subItens += "<th>Tempo De Inicio</th><th>Tempo Final</th><th>T. execução</th></thread><tbody>";

		for (var k in nomeDosAlgoritmos) {
			subItens += "<tr class=\""+ k +"\"><td class=\"nome-algoritmo\">" + nomeDosAlgoritmos[k] + "</td>";
			subItens += "<td class=\"running\"></td><td class=\"tamanho\">" + p.tamanho + "</td>";
			subItens += "<td class=\"tempo-inicio\">-</td><td class=\"tempo-final\">-</td><td class=\"tempo-total\">-</td></tr>";
		}

		subItens += "</tbody></table></td></tr>";
		return subItens;

	}


	$('#run').click(function(event) {
		configurarExecucao();
		executarEscalonamento();
	});

	var configurarExecucao = function() {

		var clockProcessador = $('#ciclo-segundo').val();
		var algoritmo = $('#alg-escalonamento').val();
		var quantum = $('#quantum').val();

		if (clockProcessador > 0) {
			config.clock = clockProcessador;
			config.algoritmo = algoritmo;
			config.quantum = quantum;

			$('.config').attr('disabled', 'disabled');
			inicializaBufferAuxiliar();
		}

		return false;
	}


	var executarEscalonamento = function() {
		if (config.clock > 0 && config.algoritmo.length > 0) {
			var pTemp = processos;
			engine;
		}
	}


	var engine = setInterval(function() {
		var fn = algoritmos[config.algoritmo];
		
		if (typeof fn === "function") { 
			fn();
			time += 1;
		}

	}, 1000);


	var temProcessosParaExecutar = function(procTemp) {
		var numeroDeProcessos = procTemp.length;

		for (i = 0; i < numeroDeProcessos; i++) {
			if (procTemp[i].tamanho > 0) {
				return true;
			}
		}
		return false;
	}
	
	var diminuiClockDoProcesso = function(p) {
		p.tamanho = p.tamanho < config.clock ? 0 : p.tamanho - config.clock;
	}


	var inicializaBufferAuxiliar = function() {
		for (var k in bufferProcessos) {
		    if (typeof bufferProcessos[k] !== 'function') {
		    	bufferProcessos[k] = $.extend(true, [], processos);
		    }
		}
	}

	var atualizarTamanhoDeProcessoNaTabela = function(processo, algoritmo) {

		var elemento = $("#processo-" + processo.id).find('.'+algoritmo);
		
		elemento.find('.tamanho').text(processo.tamanho);

		var tempoInicio = elemento.find('.tempo-inicio').text();
		if (tempoInicio == '-')  {
			elemento.find('.tempo-inicio').text(time);
			tempoInicio = time;
		}

		elemento.find('.tempo-final').text(time+1);
		elemento.find('.tempo-total').text(time+1 - tempoInicio);
	}


	var bufferProcessos = {
		fifo: [],
		shortest: [],
		priority: [],
		lottery: [],
		roundrobin: []
	}

	var comparaTamanho = function(a, b) {

		if (parseInt(a.tamanho) < parseInt(b.tamanho))
			return -1;
		if (parseInt(a.tamanho) > parseInt(b.tamanho))
			return 1;
		return 0;
	}

	var comparaPrioridade = function(a, b) {

		if (parseInt(a.prioridade) > parseInt(b.prioridade))
			return -1;
		if (parseInt(a.prioridade) < parseInt(b.prioridade))
			return 1;
		return 0;
	}

	var processosAleatorios = [];
	var processoAleatorioEscolhido = -1;

	var gerarVetorDeProcessosAleatorios = function() {
		for (p in bufferProcessos.lottery) {
			processo = bufferProcessos.lottery[p];
			for (i = 0; i < parseInt(processo.prioridade); i++) {
				processosAleatorios.push(processo.id);
			}
		}
	}

	var selecionaUmProcessoAleatorio = function() {
		var size = processosAleatorios.length;
		i = Math.floor(Math.random() * (size - 1));
		console.log(i);

		PID = processosAleatorios[i];

		for (p in bufferProcessos.lottery) {
			if (bufferProcessos.lottery[p].id == PID) {
				return bufferProcessos.lottery[p];
			}
		}

	}

	var removerProcesso = function(processo) {

		console.log(processosAleatorios);
		console.log(processo);

		var size = processosAleatorios.length - 1;
		for (i = size; i >= 0; i--) {
			if (processosAleatorios[i] == processo.id) {
				processosAleatorios.splice(i, 1);
			}
		}

		console.log(processosAleatorios);
	}

	var algoritmos = {
		fifo: function() {

			var processoEscolhido;

			for (i = 0; i < bufferProcessos.fifo.length; i++) {

				if ( bufferProcessos.fifo[i].tamanho > 0) {
					processoEscolhido = i;
					i = bufferProcessos.fifo.length;
				} else {
					processoEscolhido = -1;
				}
			}

			if (processoEscolhido == -1) {
				clearInterval(engine);
				alert("execução finalizada");
			} else {

				diminuiClockDoProcesso(bufferProcessos.fifo[processoEscolhido]);
				atualizarTamanhoDeProcessoNaTabela(bufferProcessos.fifo[processoEscolhido], 'fifo');

			}
		},
		shortest: function() {
			if (time == 0) {
				//console.log(bufferProcessos.shortest);
				bufferProcessos.shortest.sort(comparaTamanho);
				//console.log(bufferProcessos.shortest);
			}

			var processoEscolhido;

			for (i = 0; i < bufferProcessos.shortest.length; i++) {

				if ( bufferProcessos.shortest[i].tamanho > 0) {
					processoEscolhido = i;
					i = bufferProcessos.shortest.length;
				} else {
					processoEscolhido = -1;
				}
			}

			if (processoEscolhido == -1) {
				clearInterval(engine);
				alert("execução finalizada");
			} else {

				diminuiClockDoProcesso(bufferProcessos.shortest[processoEscolhido]);
				atualizarTamanhoDeProcessoNaTabela(bufferProcessos.shortest[processoEscolhido], 'shortest');

			}
		},
		priority: function() {
			if (time == 0) {
				//console.log(bufferProcessos.shortest);
				bufferProcessos.priority.sort(comparaPrioridade);
				//console.log(bufferProcessos.priority);
			}

			var processoEscolhido;

			for (i = 0; i < bufferProcessos.priority.length; i++) {

				if ( bufferProcessos.priority[i].tamanho > 0) {
					processoEscolhido = i;
					i = bufferProcessos.priority.length;
				} else {
					processoEscolhido = -1;
				}
			}

			if (processoEscolhido == -1) {
				clearInterval(engine);
				alert("execução finalizada");
			} else {

				diminuiClockDoProcesso(bufferProcessos.priority[processoEscolhido]);
				atualizarTamanhoDeProcessoNaTabela(bufferProcessos.priority[processoEscolhido], 'priority');

			}
		},
		lottery: function() {

			if (time == 0) {
				gerarVetorDeProcessosAleatorios();
				console.log(processosAleatorios);
			}

			if (processoAleatorioEscolhido == -1) {
				processoAleatorioEscolhido = selecionaUmProcessoAleatorio();
			}

			diminuiClockDoProcesso(processoAleatorioEscolhido);
			atualizarTamanhoDeProcessoNaTabela(processoAleatorioEscolhido, 'lottery');

			if (processoAleatorioEscolhido.tamanho == 0) {
				removerProcesso(processoAleatorioEscolhido);
			}

			processoAleatorioEscolhido = -1;

			if (processosAleatorios.length == 0) {
				clearInterval(engine);
				alert("execução finalizada");
			}
		},
		roundrobin: function() {
			console.log('roundrobin');
		},
		all: function() {
			algoritmos.fifo();
			algoritmos.shortest();
			algoritmos.priority();
			algoritmos.lottery();
			algoritmos.roundrobin();
		}
	}

});