const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");


class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({ name, email, password }) {
    const checkUserExist = await this.userRepository.findByEmail(email); // (?) busca o vetor seguinte

    if (checkUserExist) {
      throw new AppError("Esse email já está em uso");
    }

    const hashedPassword = await hash(password, 8);

    const useCreated = await this.userRepository.create({ name, email, password: hashedPassword });


    return useCreated
  }
}

module.exports = UserCreateService;
