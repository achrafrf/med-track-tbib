import Appointment from '../models/Appointment.js';

// الحصول على جميع المواعيد
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'فشل في تحميل المواعيد', error });
  }
};

// إضافة موعد جديد
export const createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: 'فشل في إضافة الموعد', error });
  }
};

// تحديث موعد
export const updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'فشل في تحديث الموعد', error });
  }
};

// حذف موعد
export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'تم حذف الموعد بنجاح' });
  } catch (error) {
    res.status(400).json({ message: 'فشل في حذف الموعد', error });
  }
};
