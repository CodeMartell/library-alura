import autores from "../models/Autor.js";

class AutorController {

    static listarAutores = (req, res) => {
        autores.find()
            .then((autores) => {
                res.status(200).json(autores);
            })
    }

    static listarAutorsPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const Autor = await autores.findById(id);

            if (!Autor) {
                res.status(400).send({ message: ` ${err.message} Id do Autor não localizado` });
            } else {
                res.status(200).send(Autor);
            }
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };

    static cadastrarAutor = async (req, res) => {
        try {
            const autor = new autores(req.body);
            await Autor.save();
            res.status(201).send(Autor.toJSON());
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar Autor.` });
        }
    }

    static atualizarAutor = async (req, res) => {
        try {
            const id = req.params.id;
            await autores.findByIdAndUpdate(id, req.body);
            res.status(200).send({ message: "Autor atualizado com sucesso!" });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };

    static excluirAutor = async (req, res) => {
        try {
            const id = req.params.id;
            await autores.findByIdAndDelete(id);
            res.status(200).send({ message: "Autor removido com sucesso" });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };
    


}
export default AutorController