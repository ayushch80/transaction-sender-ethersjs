 const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
 await provider.send("eth_requestAccounts", []);
 const signer = provider.getSigner()
 var userAddress = await signer.getAddress();
 document.getElementById("userAdd").innerText = "Your Address is " + userAddress;
 provider.on("network", (newNetwork, oldNetwork) => {
   if (oldNetwork) {
       window.location.reload();
   }
 });
 document.getElementById("btn_click").addEventListener("click", getData);
 async function getData() {
   const bData = document.getElementById("uData");
   const rAdd = bData.elements.namedItem("add").value;
   const rAmo = bData.elements.namedItem("amo").value;
   let txn = signer.sendTransaction({ to: rAdd, value: ethers.utils.parseEther(rAmo)});
   let tx = await txn;
   document.getElementById("_hash").innerText = "Transaction Hash : " + tx.hash;
   let receipt = await tx.wait();
   document.getElementById("_hash").innerText = "Transaction is confirmed at hash " + tx.hash;
   }
