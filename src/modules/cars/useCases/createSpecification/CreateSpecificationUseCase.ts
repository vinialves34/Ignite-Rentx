import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRespository")
    private specificationsRespository: ISpecificationsRepository
  ) {}

  execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      this.specificationsRespository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification Already Exists!");
    }

    this.specificationsRespository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
