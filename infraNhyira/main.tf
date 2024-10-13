resource "aws_instance" "public_ec2_01" {
  ami               = var.ami
  availability_zone = var.az
  instance_type     = var.inst_type
  
  ebs_block_device {
    device_name = "/dev/sda1"
    volume_size = 8
    volume_type = "gp3"
  }

  key_name                    = "shh_key"  
  subnet_id                   = var.subnet_id
  associate_public_ip_address = true
  vpc_security_group_ids      = [var.sg_id]

  tags = {
     Name = "public_ec2_01"
  }


user_data = <<-EOF
#!/bin/bash

# Atualizar pacotes
sudo apt-get update
sudo apt-get upgrade -y

# Criar a pasta se não existir
mkdir -p /home/ubuntu/frontend

# Clonar ou atualizar o repositório
cd /home/ubuntu/frontend || {
  sudo git clone https://github.com/nhyira-group5/sistema-vitalis.git /home/ubuntu/frontend
}

# Navegar para o diretório do repositório
cd /home/ubuntu/frontend || exit 1

# Instala Docker Compose
sudo apt update
sudo apt install docker-compose
 # Baixar a versão mais recente do Docker Compose
 DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -oP '"tag_name": "\K[^\"]+')
 sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

 # Atualiza pacotes e instala Java
 sudo apt-get update -y
 sudo apt-get install -y default-jdk

 # Instala Docker
sudo apt-get install -y docker.io


# Dar permissão de execução ao binário
sudo chmod +x /usr/local/bin/docker-compose


# Instalar Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Obter o certificado SSL usando Certbot (substitua pelo seu domínio)
sudo certbot --nginx -d vitalis-prod.zapto.org --non-interactive --agree-tos --email will.adolpho@sptech.school

# Atualizar o repositório
git pull origin main

# Verificar permissões no diretório do repositório
sudo chown -R $USER:$USER /home/ubuntu/frontend  # Ajustar permissões para o usuário atual

# Instalar dependências do Node.js
# (Certifique-se de que npm e Node.js estão instalados)
sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -  # Instalar Node.js (substitua a versão se necessário)
sudo apt-get install -y nodejs
sudo npm install -g npm  # Atualizar npm para a versão mais recente
sudo npm ci  # Instalar dependências do repositório

# Apagar diretório dist anterior e criar nova build
sudo rm -rf /var/www/dist
sudo npm run build

# Copiar a pasta 'dist' para o diretório web
sudo mkdir -p /var/www
sudo cp -r dist /var/www

# Ajustar permissões para o nginx (usuário www-data)
sudo chown -R www-data:www-data /var/www

# Reiniciar nginx
sudo systemctl restart nginx

# Logar o sucesso da execução do script
echo "Script de inicialização concluído" | sudo tee -a /var/log/user_data.log

  EOF
}

resource "aws_instance" "public_ec2_02" {
  ami               = var.ami
  availability_zone = var.az
  instance_type     = var.inst_type
  
  ebs_block_device {
    device_name = "/dev/sda1"
    volume_size = 8
    volume_type = "gp3"
  }

  key_name                    = "shh_key" 
  subnet_id                   = var.subnet_id
  associate_public_ip_address = true
  vpc_security_group_ids      = [var.sg_id]

  tags = {
    Name = "public_ec2_02"
  }

 user_data = <<-EOF
#!/bin/bash

# Atualizar pacotes
sudo apt-get update
sudo apt-get upgrade -y

# Criar a pasta se não existir
mkdir -p /home/ubuntu/frontend

# Clonar ou atualizar o repositório
cd /home/ubuntu/frontend || {
  sudo git clone https://github.com/nhyira-group5/sistema-vitalis.git /home/ubuntu/frontend
}

# Navegar para o diretório do repositório
cd /home/ubuntu/frontend || exit 1

# Instala Docker Compose
sudo apt update
sudo apt install docker-compose
# Baixar a versão mais recente do Docker Compose
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -oP '"tag_name": "\K[^\"]+')
sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

 # Atualiza pacotes e instala Java
 sudo apt-get update -y
 sudo apt-get install -y default-jdk

 # Instala Docker
sudo apt-get install -y docker.io

# Instalar Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Obter o certificado SSL usando Certbot (substitua pelo seu domínio)
sudo certbot --nginx -d vitalis-prod.zapto.org --non-interactive --agree-tos --email will.adolpho@sptech.school

# Atualizar o repositório
git pull origin main

# Verificar permissões no diretório do repositório
sudo chown -R $USER:$USER /home/ubuntu/frontend  # Ajustar permissões para o usuário atual

# Instalar dependências do Node.js
# (Certifique-se de que npm e Node.js estão instalados)
sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -  # Instalar Node.js (substitua a versão se necessário)
sudo apt-get install -y nodejs
sudo npm install -g npm  # Atualizar npm para a versão mais recente
sudo npm ci  # Instalar dependências do repositório

# Apagar diretório dist anterior e criar nova build
sudo rm -rf /var/www/dist
sudo npm run build

# Copiar a pasta 'dist' para o diretório web
sudo mkdir -p /var/www
sudo cp -r dist /var/www

# Ajustar permissões para o nginx (usuário www-data)
sudo chown -R www-data:www-data /var/www

# Reiniciar nginx
sudo systemctl restart nginx

# Logar o sucesso da execução do script
echo "Script de inicialização concluído" | sudo tee -a /var/log/user_data.log

  EOF
}


resource "aws_eip_association" "eip_assoc_01" {
  instance_id   = aws_instance.public_ec2_01.id
  allocation_id = "eipalloc-0b33881f72855426a" 
}

resource "aws_eip_association" "eip_assoc_02" {
  instance_id   = aws_instance.public_ec2_02.id
  allocation_id = "eipalloc-01952682e36b66c07"   
}


