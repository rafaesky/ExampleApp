
exports.getProducts = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM products;',
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    products: result.map(prod => {
                        return {
                            id_product: prod.id_product,
                            nome: prod.nome,
                            preco: prod.preco,
                            imagem_product: prod.imagem_product,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um produto específico',
                                url: process.env.URL_API + 'products/' + prod.id_product
                            }
                        }
                    })
                }
                return res.status(200).send(response);
            }
        )
    });
};

exports.postProduct = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO products (nome, preco, imagem_product) VALUES (?,?,?)',
            [
                req.body.nome,
                req.body.preco,
                req.file.path
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    productCriado: {
                        id_product: result.insertId,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        imagem_product: req.file.path,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url: process.env.URL_API + 'products'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    });
};

exports.getProduct = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM products WHERE id_product = ?;',
            [req.params.id_product],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado produto com este ID'
                    })
                }
                const response = {
                    product: {
                        id_product: result[0].id_product,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        imagem_product: result[0].imagem_product,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url: process.env.URL_API + 'products'
                        }
                    }
                }
                return res.status(200).send(response);
            }
        )
    });
};

exports.updateProduct = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE products
                SET nome        = ?,
                    preco       = ?
              WHERE id_product  = ?`,
            [
                req.body.nome,
                req.body.preco,
                req.body.id_product
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    productAtualizado: {
                        id_product: req.body.id_product,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um product específico',
                            url: process.env.URL_API + 'products/' + req.body.id_product
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
};

exports.deleteProduct = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM products WHERE id_product = ?`, [req.body.id_product],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Produto removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um product',
                        url: process.env.URL_API + 'products',
                        body: {
                            nome: 'String',
                            preco: 'Number'
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
};