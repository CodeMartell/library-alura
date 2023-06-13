import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = (req, res) => {
        livros.find()
            .populate("autor")
            .exec()
            .then((livros) => {
                res.status(200).json(livros);
            })
            .catch((err) => {
                // Handle the error appropriately
                res.status(500).json({ error: err.message });
            });
    };
    

    static listarLivrosPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const livro = await livros.findById(id)
                .populate('autor', 'nome')
                .exec();
            if (!livro) {
                res.status(400).send({ message: ` ${err.message} Id do livro não localizado` });
            } else {
                res.status(200).send(livro);
            }
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };

    static cadastrarLivro = async (req, res) => {
        try {
            const livro = new livros(req.body);
            await livro.save();
            res.status(201).send(livro.toJSON());
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar livro.` });
        }
    }

    static atualizarLivro = async (req, res) => {
        try {
            const id = req.params.id;
            await livros.findByIdAndUpdate(id, req.body);
            res.status(200).send({ message: "Livro atualizado com sucesso!" });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };

    static excluirLivro = async (req, res) => {
        try {
            const id = req.params.id;
            await livros.findByIdAndDelete(id);
            res.status(200).send({ message: "Livro removido com sucesso" });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };
    static listarLivroPorEditora = async (req, res) => {
        try {
            const editora = req.query.editora;
            const livrosPorEditora = await livros.find({"editora": editora})
            if (livrosPorEditora.length === 0) {
                res.status(404).send({ message: `Nenhum livro encontrado para a editora: ${editora}` });
            } else {
                res.status(200).send(livrosPorEditora);
            }
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };
}

export default LivroController