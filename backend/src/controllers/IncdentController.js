const connection = require('../database/connection')

const createIncident = async (req, res) => {
    const { title, description, value } = req.body
    const ong_id = req.headers.authorization
    const [id] = await connection('incidents').insert({
        title, description, value, ong_id
    })
    return res.json({ id })
}

const getAllIncidents = async (req, res) => {
    const { page = 1, limit = 5 } = req.query
    const [count] = await connection('incidents').count()

    const incidents = await connection('incidents')
        .join('ongs', 'ong_id', '=', 'incidents.ong_id')
        .limit(limit)
        .offset((page - 1) * limit)
        .select(['incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'])

    res.header('X-Total-Count', count['count(*)'])

    return res.json({ incidents })
}

const deleteIncidents = async (req, res) => {
    const { id } = req.params
    const ong_id = req.headers.authorization
    const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first()

    if (ong_id !== incident.ong_id) {
        return res.status(401).json({ error: 'Operation not permitted' })
    }
    await connection('incidents').where('id', id).delete()
    return res.status(204).send()
}


module.exports = {
    createIncident,
    getAllIncidents,
    deleteIncidents
}