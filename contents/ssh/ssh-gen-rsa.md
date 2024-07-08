## SSH Generate RSA Key Pair

- type following command to generate:

```bash
ssh-keygen -t rsa -C {{KEYNAME}} -b 2048
```

- change `{{KEYNAME}}` name
- type following command to get public key:

```bash
cat key_name.pub
```

- copy public key to .ssh/authorized_keys file in remote machine

```bash
NOTE:

total rsa key is 2048 characters
rsa key 64 characters per line
```

- set private_key.pem file permission to:

![Windows Rsa key permission](/assets/ssh/ssh-gen-rsa_rsa-file-windows-permission.png "Windows Rsa key permission")

- to connect to remote machine use following command:

```bash
ssh -i private_key.pem user@remote_machine
```