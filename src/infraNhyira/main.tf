
resource "aws_instance" "websocket_ec2_01" {
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

# Instalar git, Node.js e npm, se necessário
which git || sudo apt-get install -y git
which node || sudo apt-get install -y nodejs npm

# Clonar ou atualizar o repositório
cd /home/ubuntu/websocket || {
  git clone https://github.com/nhyira-group5/sistema-vitalis.git /home/ubuntu/frontend
}

cd /home/ubuntu/frontend
git pull origin main  # Atualiza o repositório

# Instalar dependências
npm ci

# Apagar dist anterior
sudo rm -rf /var/www/dist

# Executar build
npm run build

# Copiar o diretório 'dist' para a pasta específica
sudo cp -r dist /var/www

# Ajustar permissões para nginx (www-data)
sudo chown -R www-data:www-data /var/www

# Reiniciar nginx
sudo systemctl restart nginx

# Registrar logs
echo "Script de inicialização concluído" | tee -a /var/log/user_data.log
EOF
}

resource "aws_instance" "websocket_ec2_02" {
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

# Instalar git, Node.js e npm, se necessário
which git || sudo apt-get install -y git
which node || sudo apt-get install -y nodejs npm

# Clonar ou atualizar o repositório
cd /home/ubuntu/websocket || {
  git clone https://github.com/nhyira-group5/sistema-vitalis.git /home/ubuntu/frontend
}

cd /home/ubuntu/frontend
git pull origin main  # Atualiza o repositório

# Instalar dependências
npm ci

# Apagar dist anterior
sudo rm -rf /var/www/dist

# Executar build
npm run build

# Copiar o diretório 'dist' para a pasta específica
sudo cp -r dist /var/www

# Ajustar permissões para nginx (www-data)
sudo chown -R www-data:www-data /var/www

# Reiniciar nginx
sudo systemctl restart nginx

# Registrar logs
echo "Script de inicialização concluído" | tee -a /var/log/user_data.log
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

