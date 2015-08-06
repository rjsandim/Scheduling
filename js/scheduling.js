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
		
		processos.push(Processo);
		$("#reset").click();

		atualizarTabelaDeProcessos(Processo);

		console.log(processos);
	});

	function atualizarTabelaDeProcessos(Processo) {
		
	}

});