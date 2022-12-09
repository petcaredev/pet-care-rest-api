const db = require('../models');

const Reservation = db.reservation;
const Service = db.service;

const User = db.user;
const Clinic = db.clinic;

exports.store = async (req, res) => {
  const { userId, clinicId, date, petName, petType, description, services } =
    req.body;

  const user = await User.findByPk(userId);
  const clinic = await Clinic.findByPk(clinicId);

  const reservation = {
    date,
    petName,
    petType,
    description,
    status: false,
  };

  const reservationData = await Reservation.create(reservation);

  reservationData.setUser(user);
  reservationData.setClinic(clinic);

  const serviceData = await Service.findAll({
    where: {
      id: services,
    },

    attributes: ['id', 'name', 'price'],
  });

  reservationData.setServices(serviceData);

  res.status(201).send({
    error: false,
    message: 'Data reservasi berhasil ditambahkan.',
    data: {
      id: reservationData.id,
      date: reservationData.date,
      petName: reservationData.petName,
      petType: reservationData.petType,
      description: reservationData.description,
      status: reservationData.status,
      createdAt: reservationData.createdAt,
      updatedAt: reservationData.updatedAt,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      clinic: {
        name: clinic.name,
        address: clinic.address,
        phone: clinic.phone,
      },
      services: serviceData.map((service) => ({
        id: service.id,
        name: service.name,
        price: service.price,
      })),
    },
  });
};

exports.show = async (req, res) => {
  const { id } = req.params;

  const reservation = await Reservation.findByPk(id, {
    attributes: [
      'id',
      'date',
      'petName',
      'petType',
      'description',
      'status',
      'createdAt',
      'updatedAt',
    ],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'phone', 'address'],
      },
      {
        model: Clinic,
        as: 'clinic',
        attributes: ['id', 'name', 'address', 'phone'],
      },
      {
        model: Service,
        as: 'services',
        attributes: ['id', 'name', 'price'],
      },
    ],
  });

  if (!reservation) {
    return res.status(404).send({
      error: true,
      message: 'Data reservasi tidak ditemukan.',
    });
  }

  res.status(200).send({
    error: false,
    message: 'Data reservasi berhasil ditemukan.',
    data: reservation,
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;

  const reservation = await Reservation.findByPk(id);

  if (!reservation) {
    return res.status(404).send({
      error: true,
      message: 'Data reservasi tidak ditemukan.',
    });
  }

  const status = true;

  await reservation.update({
    status,
  });

  res.status(200).send({
    error: false,
    message: 'Reservasi telah selesai.',
  });
};

module.exports.getAllReservationByUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send({
      error: true,
      message: 'Data user tidak ditemukan.',
    });
  }

  const reservation = await Reservation.findAll({
    where: {
      userId: id,
    },
    attributes: [
      'id',
      'date',
      'petName',
      'petType',
      'description',
      'status',
      'createdAt',
      'updatedAt',
    ],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'phone', 'address'],
      },
      {
        model: Clinic,
        as: 'clinic',
        attributes: ['id', 'name', 'address', 'phone'],
      },
      {
        model: Service,
        as: 'services',
        attributes: ['id', 'name', 'price'],
      },
    ],
  });

  res.status(200).send({
    error: false,
    message: 'Data reservasi berhasil ditemukan.',
    data: reservation,
  });
};

module.exports.getAllReservationByClinic = async (req, res) => {
  const { id } = req.params;

  const clinic = await Clinic.findByPk(id);

  if (!clinic) {
    return res.status(404).send({
      error: true,
      message: 'Data klinik tidak ditemukan.',
    });
  }

  const reservation = await Reservation.findAll({
    where: {
      clinicId: id,
    },
    attributes: [
      'id',
      'date',
      'petName',
      'petType',
      'description',
      'status',
      'createdAt',
      'updatedAt',
    ],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'phone', 'address'],
      },
      {
        model: Clinic,
        as: 'clinic',
        attributes: ['id', 'name', 'address', 'phone'],
      },
      {
        model: Service,
        as: 'services',
        attributes: ['id', 'name', 'price'],
      },
    ],
  });

  res.status(200).send({
    error: false,
    message: 'Data reservasi berhasil ditemukan.',
    data: reservation,
  });
};
