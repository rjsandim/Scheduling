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

		console.log(processos);
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

});