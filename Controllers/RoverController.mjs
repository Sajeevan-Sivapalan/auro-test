import Rover from '../models/Rover.mjs';

export const addOrUpdateRovers = async (req, res) => {
    try {
        const rovers = req.body;
        const results = [];

        for (const serial_number in rovers) {
            if (rovers.hasOwnProperty(serial_number)) {
                const { client, country, date, material, time, unique_id } = rovers[serial_number];

                let rover = await Rover.findOne({ client, country, material });

                if (rover) {
                    rover.date = date;
                    rover.time = time;
                    rover.unique_id = unique_id;
                    rover.serial_number = serial_number;

                    await rover.save();
                    results.push({ serial_number, status: 'updated', rover });
                } else {
                    rover = new Rover({
                        client,
                        country,
                        date,
                        material,
                        serial_number,
                        time,
                        unique_id
                    });

                    await rover.save();
                    results.push({ serial_number, status: 'created', rover });
                }
            }
        }

        res.status(200).json({ message: 'Rovers processed successfully', results });
    } catch (error) {
        res.status(500).json({ message: 'Error processing rover details', error: error.message });
    }
};

export const getAllRovers = async (req, res) => {
    try {
        const rovers = await Rover.find();
        res.status(200).json({ message: 'All rover details retrieved successfully', rovers });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving rover details', error: error.message });
    }
};