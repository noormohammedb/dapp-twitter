const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Twitter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Twitter = await ethers.getContractFactory("Twitter");
    const twter = await Twitter.deploy("Hello, world!");
    await twter.deployed();

    expect(await twter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await twter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await twter.greet()).to.equal("Hola, mundo!");
  });
});
