$(document).ready(function() {

	var processos = [];

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

	function existeProcesso(Processo) {
		return Processo.nome.length && Processo.tamanho.length && Processo.inicia.length;
	}


	function atualizarTabelaDeProcessos(Processo) {

		var itemTabela = "<tr><td></td>";
		itemTabela += "<td>"+ Processo.index +"</td>";
		itemTabela += "<td>"+ Processo.nome +"</td>";
		itemTabela += "<td>"+ Processo.id +"</td>";
		itemTabela += "<td>"+ Processo.tamanho +"</td>";
		itemTabela += "<td>"+ Processo.prioridade +"</td>";
		itemTabela += "<td>"+ Processo.inicia +"</td>";
		itemTabela += "<td></td><td></td><td></td>";
		itemTabela += "<td><button>Editar</button> <button>Remover</button></td></tr>";
		
		$("#novo-processo").append(itemTabela);
	}

	$('#run').click(function(event) {
		var config = configurarExecucao();
		executarEscalonamento(config);
	});

	function configurarExecucao() {

		var clockProcessador = $('#ciclo-segundo').val();
		var algoritmo = $('#alg-escalonamento').val();

		if (clockProcessador > 0) {
			var config = {
				clock: clockProcessador,
				algoritmo: algoritmo
			}
			$('.config').attr('disabled', 'disabled');

			return config;
		}
		return false;
	}


	function executarEscalonamento(config) {

		var pTemp = processos;
		
		setInterval(function() {

			var resultado = temProcessosParaExecutar(pTemp);
			console.log(resultado);
			if (resultado) {
				pTemp = diminuiClockDeUmProcesso(pTemp,config.clock);
				console.log(pTemp);
			}

		}, 1000);	
	}

	function temProcessosParaExecutar(procTemp) {
		var numeroDeProcessos = procTemp.length;

		for (i = 0; i < numeroDeProcessos; i++) {
			if (procTemp[i].tamanho > 0) {
				return true;
			}
		}
		return false;
	}
	
	function diminuiClockDeUmProcesso(p, clock) {
		var size = p.length;

		for (i = 0; i < size; i++) {
			if (p[i].tamanho > 0) {
				p[i].tamanho -= clock;
				return p;
			}
		}
		return p;
	}
});